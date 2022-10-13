import { createConnection } from "mysql2";
import { DataSource } from "typeorm";
import config from "./db.config";

const environment = process.env.NODE_ENV || "development"

const db_env = config[environment]

const db = new DataSource(db_env)

db.initialize()
.then(() => {
    console.log("Successful Database Initialisation")
}).catch((err) => {
    console.log("Error during database initialisation")
})

export default db;