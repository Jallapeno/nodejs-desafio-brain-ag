import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilder {
  private versionApp: string;
  private defaultApiPath: string;
  private readonly logger = new Logger(SwaggerDocumentBuilder.name);

  constructor(
    private readonly app: INestApplication<any>,
    private readonly configService: ConfigService,
  ) {
    this.versionApp = this.configService.get('SWAGGER_VERSION_APP') || '1.0.0';
    this.defaultApiPath = this.configService.get('SWAGGER_API_PATH') || 'docs';
  }

  private buildConfig() {
    return new DocumentBuilder()
      .setTitle('Brain Agriculture API')
      .setDescription('API documentation for the Brain Agriculture project')
      .setVersion(this.versionApp)
      .build();
  }

  public setupSwagger() {
    const startTime = Date.now();

    const config = this.buildConfig();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(this.defaultApiPath, this.app, document, {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: 'Brain Agriculture API Documentation',
    });

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    this.logger.log(
      `SwaggerModule dependencies initialized ${yellow}+${loadTime}ms${reset}`,
    );
  }
}
