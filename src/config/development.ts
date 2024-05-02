import { EnvironmentBase } from './base';

export interface Development extends EnvironmentBase {
  // puedes añadir más cosas acá
  EXAMPLE_ENV?: string;
}

export const development: Development = {
  PORT: process.env.PORT!,
  DB_NAME: process.env.DB_NAME!,
  DB_HOST: process.env.DB_HOST!,
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  DB_PORT: process.env.DB_PORT!,
  TIME_ZONE: process.env.TIME_ZONE ?? 'America/Bogota',
  JWT_SECRET: process.env.JWT_SECRET!,
  EMAIL_ACCESS_KEY: process.env.EMAIL_ACCESS_KEY!,
  EMAIL_SECRET_KEY: process.env.EMAIL_SECRET_KEY!,
  EMAIL_SECURE: typeof process.env.EMAIL_SECURE !== 'undefined' ? process.env.EMAIL_SECURE === 'true' ? true : false : undefined,
  EMAIL_USE: process.env.EMAIL_USE!,
  EMAIL_HOST: process.env.EMAIL_HOST!,
  EMAIL_PORT: parseInt((process.env.EMAIL_PORT) ?? '587'),
  EMAIL_SERVICE: process.env.EMAIL_SERVICE
};