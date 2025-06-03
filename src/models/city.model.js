import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";
import State from "./state.model.js";

const City = db_object.define(
  "City",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default City;
