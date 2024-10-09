import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tony_db',
    migrationsTableName: 'migrations',
    entities: [
        "dist/**/*.entity.js"
    ],
    migrations: ["dist/migrations/*.js"],
    synchronize: true,
    migrationsRun: true,
});