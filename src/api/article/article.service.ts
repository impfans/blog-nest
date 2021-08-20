import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { IIndexBlogParams } from './article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private catRepository: Repository<Article>,
  ) {}
  /**
   *
   * @returns Article[]
   */
  async findAllArticle(): Promise<Article[]> {
    return await this.catRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .where({ deleted_at: null })
      .getMany();
  }
  /**
   * 查询单个文章
   * @param id
   * @returns
   */
  async findOneArticle(id: number): Promise<Article> {
    return this.catRepository.findOne({ id: id });
  }

  /**
   * 更新文章
   * @param id
   * @param article
   * @returns
   */
  async updateArticle(id: number, article: Article): Promise<Article> {
    let old = await this.findOneArticle(id);
    old = article;
    return this.catRepository.save(old);
  }

  /**
   *
   * @param id 删除文章
   * @returns
   */
  async deleteArticle(id: number) {
    let old = await this.findOneArticle(id);
    old.deleted_at = new Date();
    return this.catRepository.save(old);
  }

  /**
   * 首页展示文章
   * @param body
   * @returns
   */
  async findIndexBlog(
    params: IIndexBlogParams,
  ): Promise<{ list: Article[]; count: number }> {
    const { limit = 10, offset = 1 } = params;
    const list = await this.catRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .select([
        'article.id',
        'article.title',
        'article.created_at',
        'article.img',
        'article.desc',
        'category.name',
        'category.id',
      ])
      .where({ deleted_at: null })
      .limit(Number(limit))
      .offset((Number(offset) - 1) * Number(limit))
      .cache(true)
      .getMany();
    const count = await this.catRepository
      .createQueryBuilder('article')
      .where({ deleted_at: null })
      .cache(true)
      .getCount();
    return { list, count };
  }
  /**
   * 查询最新文章
   * @returns
   */
  async findNewIndexBlog() {
    return await this.catRepository
      .createQueryBuilder('article')
      .select([
        'article.id',
        'article.title',
        'article.created_at',
        'article.img',
        'article.desc',
      ])
      .where({ deleted_at: null })
      .orderBy('article.created_at', 'DESC')
      .limit(5)
      .cache(true)
      .getMany();
  }
  /**
   * 文章详情
   * @param id
   * @returns
   */
  async findArticleDetailById(id): Promise<Article> {
    return await this.catRepository
      .createQueryBuilder('article')
      .where({ id: id, deleted_at: null })
      .leftJoinAndSelect('article.category', 'category')
      .select([
        'article.id',
        'article.title',
        'article.content',
        'article.desc',
        'article.img',
        'article.created_at',
        'article.updated_at',
        'category.name',
        'category.id',
      ])
      .cache(true)
      .getOne();
  }
  /**
   * 时间轴
   * @returns
   */
  async timeLineInfo(): Promise<Article[]> {
    return await this.catRepository
      .createQueryBuilder('article')
      .where({ deleted_at: null })
      .orderBy('article.updated_at', 'DESC')
      .select([
        'article.title',
        'article.updated_at',
        'article.img',
        'article.id',
      ])
      .getMany();
  }
}
