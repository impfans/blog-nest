import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const uuid = uuidv4();
    const nowTime = new Date().getTime();
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse();
    const logger = new LoggerService();
    let ip;
    if (request.headers['x-real-ip']) {
      ip = request.headers['x-real-ip'];
    }
    if (request.headers['x-forwarded-for']) {
      ip = request.headers['x-forwarded-for'];
    }
    const messageInfo = `body = ${JSON.stringify(
      request.body,
    )} params = ${JSON.stringify(request.params)} query = ${JSON.stringify(
      request.query,
    )} headers = ${JSON.stringify(request.headers)} startTime = ${moment(
      nowTime,
    ).format('YYYY-MM-DD HH:mm')} deltaTime = ${
      new Date().getTime() - nowTime
    }ms method = ${request.method} url = ${request.url} statusCode = ${
      response.statusCode
    } ip =  ${ip || '0.0.0.0'}`;
    logger.log(messageInfo, uuid);
    return next
      .handle()
      .pipe(
        map((data) => ({
          data: data || null,
          code: response.statusCode,
          requestId: uuid,
        })),
      );
  }
}
