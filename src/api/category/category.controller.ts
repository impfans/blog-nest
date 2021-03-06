import { Controller, Get } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}
    @Get('findAllCategory')
    async findAllCategory(): Promise<{ list: Category[]; count: number }>{
        return this.categoryService.findAllCategory()
    }
}
