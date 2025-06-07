import { Sequelize } from "sequelize";
import expressMysqlSession from "express-mysql-session";
import session from "express-session";
import connectPg from "connect-pg-simple";
import pg from "pg";


// LOCAL MYSQL DB**************************************************

const db_object = new Sequelize("service_expiry_app", "root", "1111", {
    host: "localhost",
    dialect: "mysql"
});


// LOCAL POSTGRES DB**************************************************
/*
const db_object = new Sequelize("postgres", "postgres", "1", {
    host: "localhost",
    dialect: "postgres",
    port: 5432
});
*/


// --------------------------------------------------------manageing login session in db-------------------------------------



// LOCAL MYSQL DB********************************************
const MySQLStore = expressMysqlSession(session);

const session_store =  new MySQLStore({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "service_expiry_app",
    port: 3306
})


// LOCAL POSTGRES DB********************************************
/*
const pgSession = connectPg(session);

const session_store = new pgSession({
    pgPromise: false,
    pool: new pg.Pool({
        host: "localhost",
        user: "postgres",
        password: "1",
        database: "postgres",
        port: 5432,
        ssl: false
    }),
    createTableIfMissing: true
})
*/

export default db_object
export { session_store };