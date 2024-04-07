import dotenv from 'dotenv';

export interface Config {
    db_user: string,
    db_password: string,
    db_host: string,
    db_port: string,
    db_name: string,
    port: string
}

export function getConfig(): Config {
    dotenv.config();
    const configuration: Config = {
        db_user: process.env.DB_USER || 'postgres',
        db_password: process.env.DB_PASSWORD || 'postgres',
        db_host: process.env.DB_HOST || 'localhost',
        db_port: process.env.DB_PORT || '5432',
        db_name: process.env.DB_NAME || 'driver-app',
        port: process.env.PORT || '3000'
    }
    return configuration;
}