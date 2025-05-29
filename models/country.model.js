import db_object from "../DB/db.config.js";
import { DataTypes } from "sequelize";

const Country = db_object.define("Country", {
    name: {
        type: DataTypes.STRING
    }
})

export default Country;