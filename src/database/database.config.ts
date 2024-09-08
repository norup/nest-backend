import { registerAs } from '@nestjs/config';

export const TypeORMConfig = registerAs('database', () => {
  return {
    url: process.env.DATABASE_URL,
    type: process.env.DATABASE_TYPE,
    host: process.env.PGHOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 5432,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
  };
});
