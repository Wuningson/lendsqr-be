import path from "path";
import { env } from "process";
import { DataSource, DataSourceOptions } from "typeorm";
import config from "./db.config";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

const environment = process.env.NODE_ENV || "development"

const db_env = config[environment]
console.log(db_env)


// const db = new DataSource({
//         type: "better-sqlite3",
//         // username: "test",
//         // password: "test",
//         database: "test.sqlite",
//         logging: false,
//         synchronize: true,
//         entities: [User, Transaction],
//         migrations: []
//     })

const db = new DataSource(db_env)
console.log("db init: ", db)

db.initialize()
.then(() => {
    console.log("Successful Database Initialisation")
}).catch((err) => {
    console.log("Error during database initialisation")
})


    // db.createQueryBuilder()
    // .insert()
    // .into(User)
    // .values([
    //     {
    //         first_name: "Amaka",
    //         last_name: "Ifeajika",
    //         username: "paula",
    //         password: "bgbgbgbg",
    //         email: "amaka@email.com"
    //       }
    // ])
    // .execute()

    const userTable = db.getRepository(User)

    const new_user = new User()
    new_user.first_name = "Amaka",
    new_user.last_name = "Ifeajika",
    new_user.username = "paula",
    new_user.password = "bgbgbgbg",
    new_user.email = "amaka@email.com"

   userTable.save(new_user)

export default db;