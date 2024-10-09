import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
    entities: ['dist/src/module/**/*.entity.ts}'],
    migrations: ['dist/migrations/*.js'],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
};

export default typeOrmConfig;