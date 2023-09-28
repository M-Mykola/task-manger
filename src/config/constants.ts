import { config } from 'dotenv';
config();

export const {
  PORT,
  HOST,
  SWAGGER_PREFIX,
  SECRET_JWT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  SALT_ROUNDS,
} = process.env;
