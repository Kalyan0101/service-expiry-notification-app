import db_object from "../config/db.config.js";
import { DataTypes } from "sequelize";

const Service = db_object.define("Service", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    validity: {
        type: DataTypes.INTEGER,
        allowNull: false      
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Service;