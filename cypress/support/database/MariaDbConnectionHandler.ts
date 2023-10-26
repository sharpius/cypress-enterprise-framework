import {IDatabaseSettings} from "./IDatabaseSettings";
import mariadb = require("mariadb");

export class MariaDbConnectionHandler {
    private pools: { [key: string]: any } = {};

    async getPool(databaseSettings: IDatabaseSettings) {
        if (!this.pools[databaseSettings.database]) {
            this.pools[databaseSettings.database] = mariadb.createPool({
                host: databaseSettings.host,
                user: databaseSettings.username,
                password: databaseSettings.password,
                database: databaseSettings.database,
                connectionLimit: 5
            });
        }
        return this.pools[databaseSettings.database];
    }

    async query(databaseSettings: IDatabaseSettings, query: string, parameters: any[]) {
        const pool = await this.getPool(databaseSettings);
        const conn = await pool.getConnection();
        let result = await conn.query(query, parameters);

        conn.release();

        return result;
    }
}