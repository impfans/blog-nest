import { Global, Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatService } from './cat.service';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatMeta } from './cat-meta.entity';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatMeta])],
  providers: [CatService,LoggerService],
  controllers: [CatsController],
  exports: [CatService],
})
export class CatModule {
  constructor(private readonly connection: Connection) {}
}
