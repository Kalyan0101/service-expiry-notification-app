import User from "./user.model.js";
import Service from "./service.model.js";

User.hasMany(Service, {
    foreignKey: "user_id"
},{
    constraints: false
}
)
Service.belongsTo(User, {
    foreignKey: "user_id"
},{
    constraints: false
})