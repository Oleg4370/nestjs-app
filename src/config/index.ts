import * as pino from 'pino';
import * as dotenv from 'dotenv';
import { configSchema } from './config.schema';

const logger = pino();
dotenv.config();

export interface ConfigInterface {
  server: {
    port: number;
    baseUrl: string;
  },
  token: {
    secret: string;
    expiresIn: string;
  },
  dataBase: {
    name: string;
    host: string;
    port: number;
    user: string;
    password: string;
    provider: string;
    userRepo: string;
  }
}

const configData: ConfigInterface = {
  server: {
    port: parseInt(process.env.PORT, 10),
    baseUrl: process.env.BASE_URL ?? '/'
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.TOKEN_EXP ?? '1h'
  },
  dataBase: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    provider: process.env.DB_PROVIDER ?? 'DATABASE_CONNECTION',
    userRepo: process.env.DB_USER_REPO ?? 'USER_REPOSITORY',
  }
}

export const config = ((): ConfigInterface => {
  const { value, error } = configSchema.validate(configData);

  if (error) {
    logger.error('Config validation error', error);
  }
  return value;
})();
