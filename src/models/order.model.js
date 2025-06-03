import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";

const Order = db_object.define("Order", {
  purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Order;
