import { Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes } from '@nestjs/common';
import { JoiValidationPipe,ValidationPipe } from 'src/pipes/validate.pipe';
import { createUserSchema } from 'src/schema/schema';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { IsString, IsInt } from 'class-validator';
import { IIndexBlogParams } from './article.interface';

@Controller('article')
export class ArticleController {
    constructor(private articleService:ArticleService){}
    @Get('findAllArticle')
    @HttpCode(500)
    async findAllArticle(){
        return await this.articleService.findAllArticle()
    }
    @Get('findOneArticle')
    async findOneArticle(@Query() query){
        console.log(query)
        return await this.articleService.findOneArticle(query.id)
    }
    @Post('updateArticle')
    async updateArticle(@Body() body:Article){
        const {id} = body
        return await this.articleService.updateArticle(id,body)
    }
    @Post('deleteArticle')
    async deleteArticle(@Body() body){
        const {id} = body
        return await this.articleService.deleteArticle(id)
    }
    @Get('findIndexBlog')
    async findIndexBlog(@Query() params: IIndexBlogParams){     
        return await this.articleService.findIndexBlog(params)
    }
    @Get('findNewIndexBlog')
    async findNewIndexBlog(){
        return await this.articleService.findNewIndexBlog();
    }
    @Get('findArticleDetailById/:id')
    async findArticleDetailById(@Param() params){
        return await this.articleService.findArticleDetailById(params.id);
    }
    @Get('timeLineInfo')
    async timeLineInfo(){
        return await this.articleService.timeLineInfo();
    }
}
