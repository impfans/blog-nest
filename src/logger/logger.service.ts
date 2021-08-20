import { Logger as AppLogger } from '@nestjs/common';
import { Logger as log4jsLogger, configure, getLogger } from 'log4js';

export class LoggerService extends AppLogger {
  log4js: log4jsLogger;
  constructor() {
    super();
    configure({
      appenders: {
        all: {
          filename: `log/nest.service.log`,
          type: 'dateFile',
          layout: { type: 'pattern', pattern: '%d [%p] %m' },
          pattern: 'yyyy-MM-dd',
          keepFileExt: true,
          alwaysIncludePattern: true,
          daysToKeep: 10,
        },
      },
      categories: { default: { appenders: ['all'], level: 'all' } },
    });
    this.log4js = getLogger();
  }
  log(message: string, trace: string): void {
    this.log4js.info(trace, message);
  }

  error(message: string, trace: string): void {
    this.log4js.error(trace, message);
  }

  warn(message: string, trace: string): void {
    this.log4js.warn(trace, message);
  }

  debug(message: string, trace: string): void {
    this.log4js.debug(trace, message);
  }

  verbose(message: string, trace: string): void {
    this.log4js.info(trace, message);
  }
}
