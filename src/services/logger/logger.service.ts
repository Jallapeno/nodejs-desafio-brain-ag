import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createWinstonLogger } from 'src/infra/config/logger/logger.config';

import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = createWinstonLogger(configService);
  }

  info(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, ...meta });
  }

  error(message: string, stackTrace: any, context?: string, meta?: any) {
    this.logger.error(message, { stackTrace, context, ...meta });
  }

  warn(message: string, context?: string, meta?: any) {
    this.logger.warn(message, { context, ...meta });
  }

  debug(message: string, context?: string, meta?: any) {
    this.logger.debug(message, { context, ...meta });
  }

  verbose(message: string, context?: string, meta?: any) {
    this.logger.verbose(message, { context, ...meta });
  }
}
