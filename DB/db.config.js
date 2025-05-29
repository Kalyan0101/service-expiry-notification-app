import { Sequelize } from "sequelize";
import expressMysqlSession  from "express-mysql-session";
import session from "express-session";
import 'dotenv/config'

// console.log(process.env);


const db_object = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql"
});

// const db_object = new Sequelize("service_expiry_app", "root", "Password@123", {
//     host: "localhost",
//     dialect: "mysql"
// });

const MySQLStore = expressMysqlSession(session);

// const session_store =  new MySQLStore(process.env.MYSQL_URL)

const session_store =  new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

export default db_object
export { session_store };