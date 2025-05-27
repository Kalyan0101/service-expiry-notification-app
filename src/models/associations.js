import User from "./user.model.js";
import Service from "./service.model.js";

User.hasMany(Service, {
    foreignKey: "user_id"
})
Service.belongsTo(User, {
    foreignKey: "user_id"
})