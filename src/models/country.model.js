import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";

const Country = db_object.define(
  "Country",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Country;
