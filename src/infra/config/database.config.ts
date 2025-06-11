import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [__dirname + '/../entities/mikro-orm/*.js'],
        entitiesTs: [__dirname + '/../entities/mikro-orm/*.ts'],
        dbName: configService.get<string>('SERVER_DB_NAME'),
        user: configService.get<string>('SERVER_DB_USER'),
        password: configService.get<string>('SERVER_DB_PASSWORD'),
        host: configService.get<string>('SERVER_DB_HOST'),
        port: parseInt(configService.get<string>('SERVER_DB_PORT') || '5432', 10),
        driver: PostgreSqlDriver,
      }),
    }),
    MikroOrmModule
  ],
  exports: [MikroOrmModule],
})
export class DatabaseConfigModule { }
