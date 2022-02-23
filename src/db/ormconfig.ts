import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import path from 'path';
import Servers from './models/Server.Model';
import Application from './models/Application.Model';
import History from './models/History.Model';

dotenv.config();

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'ezego1',
  password: process.env.DB_PASSWORD || '356901',
  database: process.env.DB_NAME || 'smart-check',
  synchronize: process.env.DB_NO_SYNC,
  logging: process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [Servers, Application, History],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
