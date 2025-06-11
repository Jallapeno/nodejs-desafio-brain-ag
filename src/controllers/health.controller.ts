import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION_REPOSITORY } from 'src/constants/constants';
import { DatabaseHealthRepository } from 'src/infra/repositories/database-health.repository';

@Controller()
export class HealthController {
  constructor(
    @Inject(DATABASE_CONNECTION_REPOSITORY)
    private readonly databaseHealthRepository: DatabaseHealthRepository, // Replace 'any' with the actual type
  ) { }

  @Get('health')
  @HttpCode(200)
  async healthCheck(): Promise<{ status: string }> {
    try {
      const isDatabaseHealthy = await this.databaseHealthRepository.checkConnection();
      if (!isDatabaseHealthy) {
        throw new Error('Database connection failed');
      }
      return { status: 'Database connected' };
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  }
}
