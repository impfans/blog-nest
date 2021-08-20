import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { logger } from './modules/cat/logger.middleware';
import { RolesGuard } from './modules/cat/roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggers = new LoggerService();
  app.useLogger(loggers);
  app.use(logger);
  app.useGlobalGuards(new RolesGuard());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('这是接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(8080);
  loggers.log('🚀 服务应用已经成功启动！', 'bootstrap');

}
bootstrap();
