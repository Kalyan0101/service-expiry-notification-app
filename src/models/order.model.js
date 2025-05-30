import db_object from "../config/db.config";
import { DataTypes } from "sequelize";

const Order = db_object.define("Order", {
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cusomer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
})

export default Order;