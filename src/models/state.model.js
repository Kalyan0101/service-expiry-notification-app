import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";
import Country from "./country.model.js";

const State = db_object.define(
  "State",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default State;
