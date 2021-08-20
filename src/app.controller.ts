import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { JoiValidationPipe } from './pipes/validate.pipe';
import { createUserSchema } from './schema/schema';
import { IsDefined, IsInt, IsPort, IsString } from 'class-validator';
import { ParseIntPipe } from './pipes/parse-int.pipe';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
export class CreateCatDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsPort()
  breed?: string;
}
@Controller({ host: 'localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): [{ result: string; code: number }] {
    return this.appService.getHello();
  }
  @Post('create')
  create(@Body() createCatDto: CreateCatDto) {
    return this.appService.create(createCatDto);
  }
  @Get('findOne/:id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get('httpExp')
  async findAll() {
    throw new ForbiddenException();
  }
  @Post('filter')
  @UseFilters(HttpExceptionFilter)
  async filter(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Post('pipe')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async pipe(@Body() createCatDto: CreateCatDto) {
    return this.appService.create(createCatDto);
  }
  @Post('classPipe')
  async classPipe(@Body() createCatDto: CreateCatDto) {
    this.appService.create(createCatDto);
  }
  @Get('findOnePipe/:id')
  async findOnePipe(@Param('id', new ParseIntPipe()) id) {
    return await this.appService.findOne(id);
  }
}
