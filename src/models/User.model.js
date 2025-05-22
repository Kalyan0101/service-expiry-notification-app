import db_object from "../config/db.config.js";
import { DataTypes } from "sequelize";

const User = db_object.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;