import User from "./user.model.js";
import Service from "./service.model.js";
import Order from "./order.model.js";
import OrderHasService from "./order_has_service.model.js";
import Customer from "./customer.model.js";

User.hasMany(Service, {
    foreignKey: "user_id",
    constraints: false
});

Service.belongsTo(User, {
    foreignKey: "user_id",
    constraints: false
});

User.hasMany(Order, {
    foreignKey: "user_id",
    constraints: false
});

Order.belongsTo(User, {
    foreignKey: "user_id",
    constraints: false
});

Customer.hasMany(Order, {
    foreignKey: "customer_id",
    constraints: false
});

Order.belongsTo(Customer, {
    foreignKey: "customer_id",
    constraints: false,
    onDelete: 'CASCADE'
});

Order.belongsToMany(Service, {
    through: OrderHasService,
    foreignKey: "order_id",
    onDelete: 'CASCADE'
});

Service.belongsToMany(Order, {
    through: OrderHasService,
    foreignKey: "service_id",
    onDelete: 'CASCADE'
});

OrderHasService.belongsTo(Service, { foreignKey: 'service_id' });
OrderHasService.belongsTo(Order, { foreignKey: 'order_id' });

Service.hasMany(OrderHasService, { foreignKey: 'service_id' });
Order.hasMany(OrderHasService, { foreignKey: 'order_id' });
