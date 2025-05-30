import { Sequelize } from "sequelize";
import expressMysqlSession  from "express-mysql-session";
import session from "express-session";
import dotenv from 'dotenv'

dotenv.config();

const db_object = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
});

const MySQLStore = expressMysqlSession(session);

const session_store =  new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

export default db_object
export { session_store };