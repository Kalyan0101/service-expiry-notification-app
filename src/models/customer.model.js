import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";
import Country from "./country.model.js";
import State from "./state.model.js";
import City from "./city.model.js";
import User from "./user.model.js";

const Customer = db_object.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ph_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: "id",
    },
  },
  state_id: {
    type: DataTypes.INTEGER,
    references: {
      model: State,
      key: "id",
    },
  },
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Customer;
