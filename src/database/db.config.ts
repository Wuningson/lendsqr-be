/* Database Configuration File */

const config: { [key: string]: any} = {
    development: {
        type: "better-sqlite3",
        // username: "test",
        // password: "test",
        database: "test.sqlite",
    },

    test: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
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