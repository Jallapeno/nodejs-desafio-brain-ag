import { ConfigService } from '@nestjs/config';

export const envValidateConfig = (configService: ConfigService) => {
  const requiredEnvs = [
    'SERVER_PORT',
    'NODE_ENV',
    'LOKI_HOST',
    'LOKI_SERVICE_NAME',
    'SERVER_DB_HOST',
    'SERVER_DB_PORT',
    'SERVER_DB_USER',
    'SERVER_DB_PASSWORD',
    'SERVER_DB_NAME',
  ];
  for (const env of requiredEnvs) {
    if (!configService.get(env)) {
      throw new Error(`Required ENV not found: ${env}`);
    }
  }
};
