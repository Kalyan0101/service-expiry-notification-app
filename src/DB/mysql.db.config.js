import { Sequelize } from "sequelize";
import expressMysqlSession  from "express-mysql-session";
import session from "express-session";
import dotenv from 'dotenv'

dotenv.config();

// CLOUD BD*********************************************

const db_object = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USER, process.env.MYSQL_DB_PASSWORD, {
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql"
});

// manageing login session in db
const MySQLStore = expressMysqlSession(session);

// CLOUD BD******************************************
const session_store =  new MySQLStore({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: process.env.MYSQL_DB_PORT
})


export default db_object
export { session_store };