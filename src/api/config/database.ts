import pg from "pg-promise/typescript/pg-subset";
import { Config, getConfig } from "./config";
import pgp from "pg-promise";

const config: Config = getConfig();

export const startConnection = () => {
    const { db_user, db_password, db_host, db_port, db_name } = config;
    return pgp()(`postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`);
};

export const endConnection = async (connection: pgp.IDatabase<{}, pg.IClient>) => {
    return await connection.$pool.end();
};