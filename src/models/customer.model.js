import db_object from "../config/db.config";
import { DataTypes } from "sequelize";

const Customer = db_object.define("Customer", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ph_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    country_id: {
        type: DataTypes.INTEGER
    },
    state_id: {
        type: DataTypes.INTEGER
    },
    city_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    }
})

export default Customer;