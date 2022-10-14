/* Database Configuration File */

import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

const config: { [key: string]: any} = {
    development: {
        type: "better-sqlite3",
        // username: "test",
        // password: "test",
        database: "test.sqlite",
        logging: false,
        synchronize: true,
        entities: [User, Transaction],
        migrations: []
    },

    test: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "lendsqr",
    },

    production: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
    }
}

export default config;