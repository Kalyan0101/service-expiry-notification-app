import { db_object } from "../DB/index.js";
import { DataTypes } from "sequelize";
import Order from "./order.model.js";
import Service from "./service.model.js";

const OrderHasService = db_object.define("OrderHasService", {
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: "id",
    },
  },
  service_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Service,
      key: "id",
    },
  },
});
export default OrderHasService;
