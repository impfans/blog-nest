import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment  from 'moment';
import { LoggerService } from 'src/logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    try {
      const uuid = uuidv4();
      const nowTime = new Date().getTime();
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = exception.message;
      if (!(exception instanceof HttpException)) {
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
        )} headers = ${JSON.stringify(
          request.headers,
        )}  startTime = ${moment(nowTime).format('YYYY-MM-DD HH:mm') } deltaTime = ${
          new Date().getTime() - nowTime
        }ms method = ${request.method} url = ${request.url} statusCode = ${
          response.statusCode
        } ip =  ${ip || '0.0.0.0'} message = ${message}`;
        this.logger.error(messageInfo, uuid);
      }
      response.status(status).json({
        code: status,
        requestId: uuid,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
