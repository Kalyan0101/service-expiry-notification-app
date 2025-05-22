import db_object from "../config/db.config.js";
import { DataTypes } from "sequelize";

const City = db_object.define("City", {
    name: {
        type: DataTypes.STRING
    },
    state_id: {
        type: DataTypes.INTEGER
    }
})

export default City;