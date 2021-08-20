import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './modules/cat/cat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './api/article/article.module';
import { CategoryModule } from './api/category/category.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
@Module({
  imports: [
    CategoryModule,
    CatModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dwstack.top',
      port: 3306,
      username: 'root',
      password: 'du090918',
      database: 'nestBlog',
      autoLoadEntities: true,
      synchronize: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath:join(__dirname),
      exclude:['/api*'],
    }),

  ],
  controllers: [AppController],
  providers: [
    LoggerService,
    ConfigService,
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(logger).forRoutes(CatsController);
//   }
// }
export class AppModule {}
