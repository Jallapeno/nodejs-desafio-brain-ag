/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { envValidateConfig } from './infra/config/envs/env-validate.config';
import { SwaggerDocumentBuilder } from './infra/config/swagger-config-builder';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 100 * 1024 * 1024 }),
  );

  const configService = app.get(ConfigService);
  envValidateConfig(configService);

  const swaggerDocBuilder = new SwaggerDocumentBuilder(app, configService);
  swaggerDocBuilder.setupSwagger();

  const port = configService.get('SERVER_PORT') || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(
    `Swagger documentation is available at: ${await app.getUrl()}/docs`,
  );
}

bootstrap();
