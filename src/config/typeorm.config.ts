import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

// Consistent configuration for the application
const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql', // Changed to mysql for consistency
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    autoLoadEntities: true, // autoLoadEntities is often easier than specifying the path
    migrationsTableName: 'migrations',
    // entities: ['dist/**/*.entity.js'], // Corrected path, but autoLoadEntities is better
    migrations: ['dist/migrations/*.js'],
    synchronize: true, // Be cautious with this in production
    dropSchema: false,
    migrationsRun: true,
    logging: true, // Enabled logging to see database queries
};

export default typeOrmConfig;
