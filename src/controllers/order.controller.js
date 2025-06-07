import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import { async_handler } from "../utils/async_handler.js";

const all_order = async_handler(async (req, res) => {
    try {
        const where = {}

        // designed to intercept values prefix with # >> orderid
        if (req.query && req.query.idORnumber) {
            const { idORnumber } = req.query;
            if (idORnumber.includes("#")) {
                where.id = idORnumber.slice(1);
            }
        }

        const orders = await Order.findAll({
            where,
            attributes: { exclude: ["user_id", "customer_id"] },
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: Customer,
                    attributes: ["name", "ph_number"]
                },
                {
                    model: Service,
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        if (req.query.idORnumber && Object.keys(where).length === 0) {
            const order = orders.map(order => order.get({ plain: true }))
            .filter(order => order.Customer.ph_number == req.query.idORnumber);

            return res.json(order);
        };

        return res.json(orders);

    } catch (error) {
        console.log(error)
        return res.json({ status: 500, message: error.message })
    }
});

const create_order = async_handler(async (req, res) => {
    try {
        const { customer } = req.body;
        const { id } = req.session.user;

        if (!customer) return res.json({ success: 400, message: "***Need to select customer first!" });

        const serviceIds = Object.keys(req.body)
            .filter(keys => keys.startsWith("service_"))
            .map(key => parseInt(req.body[key], 10))
            .filter(id => !isNaN(id));

        const order = await Order.create({
            customer_id: customer,
            user_id: id,
            purchase_date: new Date()
        })
        await order.addServices(serviceIds);

        console.log(order); // FLAG:

        return res.json({ status: 200, message: "Order has created" });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "***Order not created!" });
    }
})

const update_order = async_handler(async (req, res) => { });

const delete_order = async_handler(async (req, res) => {
    try {

        const { order_id } = req.query;

        console.log(order_id);

        if (!order_id) return res.json({ success: 400, message: "order id required!" });

        const isDeleted = await Order.destroy({
            where: { id: order_id }
        });

        if (!isDeleted) return res.json({ success: 500, message: "Order not Deleted!" });

        return res.json({ seccess: 200, message: "Order Deleted." });


    } catch (error) {
        console.log(error);
        return res.json({ success: 500, message: "Deletion Failed!" });
    }
});

export { all_order, create_order, update_order, delete_order };