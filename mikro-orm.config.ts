// filepath: /home/hytal-wsl/projects/desafio-brain-agriculture-v2/nodejs-desafio-brain-ag/mikro-orm.config.ts
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  host: process.env.SERVER_DB_HOST || 'localhost',
  port: Number(process.env.SERVER_DB_PORT) || 5432,
  user: process.env.SERVER_DB_USER || 'myuser',
  password: process.env.SERVER_DB_PASSWORD || 'mypassword',
  dbName: process.env.SERVER_DB_NAME || 'brainagdb',
  entities: [__dirname + '/../entities/mikro-orm/*.js'],
  entitiesTs: [__dirname + '/../entities/mikro-orm/*.ts'],
  migrations: {
    path: './migrations',
    pathTs: './migrations',
  },
});
