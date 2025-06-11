import { HttpStatus } from '@nestjs/common';
import { LoggingDataDto } from 'src/dtos/logger/logging-data.dto';

export function mountLoggingDataUtils(
  traceId: string,
  severity: string,
  httpStatusCode: HttpStatus,
  apiMessage: any,
  endpoint: string = null,
  method = 'GET',
  stackException?: any,
) {
  return new LoggingDataDto(
    severity,
    httpStatusCode,
    new Date().toLocaleString('sv', { timeZone: 'America/Sao_Paulo' }),
    endpoint,
    method,
    traceId,
    apiMessage,
    stackException,
  );
}

/**
 * Substitui todos os caracteres de um endereço de e-mail por asteriscos.
 *
 * <p>Esta função verifica se a string fornecida contém um endereço de e-mail
 * e substitui todos os seus caracteres por asteriscos, mantendo o mesmo
 * número de caracteres. É útil para anonimizar completamente endereços de
 * e-mail em logs ou exibições públicas.</p>
 *
 * @param str A string que pode conter um endereço de e-mail.
 * @return A string com todos os caracteres do e-mail substituídos por asteriscos.
 */
export function switchEmailToAsterisc(str = '') {
  // Substitui todos os caracteres de um e-mail por asteriscos, mantendo o formato
  return str.replace(
    /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
    (match) => {
      return '*'.repeat(match.length);
    },
  );
}
