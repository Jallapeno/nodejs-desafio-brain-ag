import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

export const createWinstonLogger = (configService: ConfigService) => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }), // Captura stack trace
      winston.format.json(),
    ),
    transports: [
      // Loki Transport para Grafana Cloud ou outro ambiente
      new LokiTransport({
        host: configService.get<string>('LOKI_HOST'),
        labels: {
          environment: configService.get<string>('NODE_ENV'),
          service: configService.get<string>('LOKI_SERVICE_NAME'),
        },
        replaceTimestamp: true,
      }),

      // Transporte para o console
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({ all: true })),
      }),
    ],
  });
};
