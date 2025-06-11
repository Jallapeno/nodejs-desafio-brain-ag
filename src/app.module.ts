import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger.module';
import { DatabaseConfigModule } from './infra/config/database.config';
import { HealthModule } from './modules/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
    }),
    LoggerModule,
    DatabaseConfigModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
