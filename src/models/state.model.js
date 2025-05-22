import db_object from "../config/db.config.js";
import { DataTypes } from "sequelize";

const State = db_object.define("State", {
    name: {
        type: DataTypes.STRING
    },
    country_id: {
        type: DataTypes.INTEGER
    }
})

export default State;