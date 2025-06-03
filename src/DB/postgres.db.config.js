import { Sequelize } from "sequelize";
import expressMysqlSession from "express-mysql-session";
import session from "express-session";
import dotenv from 'dotenv'
import connectPg from "connect-pg-simple";
import pg from "pg";

dotenv.config();

// CLOUD POSTGRESQL*********************************************

const db_object = new Sequelize(process.env.PG_DB_NAME, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    pool: process.env.PG_DB_POLL_MODE,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


// ------------------------------------------manageing login session in db-------------------------------------------

// CLOUD POSTGRESQL******************************************
const pgSession = connectPg(session);

const session_store = new pgSession({
    pgPromise: false,
    pool: new pg.Pool({
        host: process.env.PG_DB_HOST,
        user: process.env.PG_DB_USER,
        password: process.env.PG_DB_PASSWORD,
        database: process.env.PG_DB_NAME,
        port: process.env.PG_DB_PORT,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }),
    createTableIfMissing: true
})


export default db_object
export { session_store };