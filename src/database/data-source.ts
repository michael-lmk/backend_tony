import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  migrationsTableName: 'migrations',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  migrationsRun: true,
});
