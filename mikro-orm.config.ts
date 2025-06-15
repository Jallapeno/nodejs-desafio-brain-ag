// filepath: /home/hytal-wsl/projects/desafio-brain-agriculture-v2/nodejs-desafio-brain-ag/mikro-orm.config.ts
import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  host: process.env.SERVER_DB_HOST || 'localhost',
  port: Number(process.env.SERVER_DB_PORT) || 5432,
  user: process.env.SERVER_DB_USER || 'myuser',
  password: process.env.SERVER_DB_PASSWORD || 'mypassword',
  dbName: process.env.SERVER_DB_NAME || 'brainagdb',
  // Para uso em produção (compilado com tsc)
  entities: ['./dist/infra/entities/mikro-orm'],

  // Para uso em desenvolvimento com ts-node
  entitiesTs: ['./src/infra/entities/mikro-orm'],
  migrations: {
    path: './migrations',
    pathTs: './migrations',
  },
});
