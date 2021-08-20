import { Body, Controller, Get, HttpCode, Inject, Post, UseInterceptors } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CatService } from './cat.service';

@Controller('cat')
export class CatsController {
  constructor(
    private CatService: CatService,
    private logger: LoggerService
    ) {}

  @Get('findAll')
  @HttpCode(500)
  async findAll() {
    this.logger.log('findAll--->','cat/findAll')
    return await this.CatService.findAll();
  }
  @Post('create')
  async create(@Body() Body) {
    return await this.CatService.create(Body);
  }
}
