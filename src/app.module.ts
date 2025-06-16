import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './modules/logger.module';
import { DatabaseConfigModule } from './infra/config/database.config';
import { HealthModule } from './modules/health.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exception/filter/all.exceptions.filter';
import { ProducerModule } from './modules/producer.module';
import { RuralPropertyModule } from './modules/rural-property.module';

const AllExceptionsFilterProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available globally
    }),
    LoggerModule,
    DatabaseConfigModule,
    HealthModule,
    ProducerModule,
    RuralPropertyModule
  ],
  providers: [AllExceptionsFilterProvider],
})
export class AppModule { }
