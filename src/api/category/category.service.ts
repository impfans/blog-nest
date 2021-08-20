import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  /**
   * 首页分类展示
   * @returns 
   */
  async findAllCategory(): Promise<{ list: Category[]; count: number }> {
    const count = await this.categoryRepository
      .createQueryBuilder('category')
      .where({ deleted_at: null })
      .getCount();
    const list = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.articles','articles')
      .where({ deleted_at: null })
      .select(['category.name','category.id','category.created_at','articles.id'])
      .cache(true)
      .getMany();
    return { count, list };
  }
}
