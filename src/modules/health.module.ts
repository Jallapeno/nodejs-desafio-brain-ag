import { Module } from '@nestjs/common';
import { HealthController } from 'src/controllers/health.controller';
import { DatabaseHealthRepository } from 'src/infra/repositories/database-health.repository';
import { DATABASE_CONNECTION_REPOSITORY } from 'src/constants/constants';
import { LoggerModule } from './logger.module';

const DatabaseHealthRepositoryProvider = {
  provide: DATABASE_CONNECTION_REPOSITORY,
  useClass: DatabaseHealthRepository,
};
@Module({
  imports: [LoggerModule],
  controllers: [HealthController],
  providers: [DatabaseHealthRepositoryProvider],
})
export class HealthModule { }
