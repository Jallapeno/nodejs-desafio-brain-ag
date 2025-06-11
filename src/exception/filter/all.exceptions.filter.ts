import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Injectable,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LoggerService } from 'src/services/logger/logger.service';
import { mountLoggingDataUtils } from 'src/utils/logger/logger.utils';


@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) { }

  catch(exception: any, host: ArgumentsHost) {
    const allExceptionsCtx = host.switchToHttp();
    const allExceptionsRequest = allExceptionsCtx.getRequest<FastifyRequest>();
    const allExceptionsResponse = allExceptionsCtx.getResponse<FastifyReply>();
    const allExceptionsStatus = exception?.status || 500;

    // Coleta informações do erro e contexto
    const severity = exception?.severity || 'critical';
    const message = exception?.message || 'Internal Server Error';
    const path = allExceptionsRequest?.routeOptions.url;
    const method = allExceptionsRequest?.method;

    const traceId =
      allExceptionsRequest.headers['x-trace-id']?.toString() || 'unknown';

    const loggingData = mountLoggingDataUtils(
      traceId,
      severity,
      allExceptionsStatus,
      message,
      path,
      method,
      exception,
    );

    this.logger.error(
      message,
      loggingData,
      AllExceptionsFilter.name.toString(),
      {
        traceId,
      },
    );

    const resBody = {
      status: allExceptionsStatus,
      body: {
        message: message,
        traceId: traceId,
        severity: severity,
        timestamp: new Date().toISOString(),
        path: path,
        method: method,
        stackTrace: exception?.stack,
        error: exception,
      },
    };

    // Retorna a resposta ao cliente
    allExceptionsResponse.status(allExceptionsStatus).send(resBody);
  }
}
