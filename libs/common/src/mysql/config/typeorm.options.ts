import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { env } from '@app/common/config';
import * as allEntities from '../AllEntities';
//If you enable migration you should have the first migration in below folder
// import * as allMigrations from '../migration'
import { values } from 'lodash';
import { DataSourceOptions } from 'typeorm';

const dbTimeout = process.env.DB_TIMEOUT
  ? parseInt(process.env.DB_TIMEOUT, undefined)
  : 30 * 1000;
export const dbOptions: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  charset: 'utf8mb4_unicode_ci',
  entities: values(allEntities),
  // migrations: values(allMigrations) ,
  replication: {
    restoreNodeTimeout: 155 * 1000, // milliseconds
    master: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', undefined),
      username: process.env.DB_USERNAME || 'dbAdmin',
      password: process.env.DB_PASSWORD || 'defaultPassword',
      database: process.env.DB_NAME || `experimental_${env.currentEnv}`,
    },
    slaves: [
      {
        host: process.env.DB_READ_HOST || process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', undefined),
        username: process.env.DB_USERNAME || 'dbAdmin',
        password: process.env.DB_PASSWORD || 'defaultPassword',
        database: process.env.DB_NAME || `experimental_${env.currentEnv}`,
      },
    ],
  },
  acquireTimeout: dbTimeout,
  connectTimeout: dbTimeout,
  timezone: 'Z',
  synchronize: true,
  logging: false,
  dropSchema: false,
  extra: {
    // Default is 10
    connectionLimit: env.isTest ? 5 : 10,
    // Default is 0 and mean (unlimited)
    queueLimit: 0,
  },
};

//TODO mysql: add cache
//TODO mysql: add logger

export class TypeormOptions implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...dbOptions,
      // This only applies to nest application shutdown
      // Set to true in lambda environment so that it will avoid AlreadyHasActiveConnectionError
      keepConnectionAlive: env.isLambda ? true : false,
      logging: !env.isTest,
    };
  }
}
