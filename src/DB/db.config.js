import { Sequelize } from "sequelize";
import expressMysqlSession  from "express-mysql-session";
import session from "express-session";
import dotenv from 'dotenv'

dotenv.config();

// CLOUD BD
const db_object = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
});


// LOCAL DB
// const db_object = new Sequelize("service_expiry_app", "root", "1111", {
//     host: "localhost",
//     dialect: "mysql"
// });

const MySQLStore = expressMysqlSession(session);

// CLOUD BD
const session_store =  new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

// LOCAL DB
// const session_store =  new MySQLStore({
//     host: "localhost",
//     user: "root",
//     password: "1111",
//     database: "service_expiry_app",
//     port: 3306
// })

export default db_object
export { session_store };