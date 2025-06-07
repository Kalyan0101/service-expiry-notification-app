import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import { async_handler } from "../utils/async_handler.js";

const getDayfromExpirydata = async_handler(async (req, res) => {
    const DAY = parseInt(req.params.day);
    if (![15, 30].includes(DAY)) {
        return res.status(400).json({
            message: "Invalid day parameter. It should be a number between 1 and 30.",
        });
    }
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Customer,
                    attributes: ["name", "email"],
                },
                {
                    model: Service,
                    attributes: ["name", "price", "validity"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        const currentDate = new Date();
        const result = [];
        // const expiryDaysFromNow = new Date();
        // expiryDaysFromNow.setDate(currentDate.getDate() + DAY);

        orders.forEach((order) => {
            (order.Services || []).forEach((service) => {
                const expiryDate = new Date(order.purchase_date);
                expiryDate.setDate(expiryDate.getDate() + service.validity);
                const diffInDays = Math.ceil(
                    (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
                );

                if (diffInDays <= DAY) {
                    result.push({
                        order_id: order.id,
                        customer_name: order.Customer.name,
                        email: order.Customer.email,
                        service_name: service.name,
                        price: service.price,
                        expiryDate: expiryDate.toISOString().split("T")[0],
                    });
                }
            });
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const dashboard_stats = async_handler(async (req, res) => {

    const result = {};

    const user = await User.findAndCountAll();
    const customer = await Customer.findAndCountAll();
    const service = await Service.findAndCountAll();
    const order = await Order.findAndCountAll();

    result.user = user.count;
    result.customer = customer.count;
    result.service = service.count;
    result.order = order.count;

    return res.json(result)
});

export { getDayfromExpirydata, dashboard_stats}