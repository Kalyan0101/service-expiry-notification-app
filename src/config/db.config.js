import { Sequelize } from "sequelize";

const db_object = new Sequelize("service_expiry_app", "root", "Password@123", {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
});

export default db_object;