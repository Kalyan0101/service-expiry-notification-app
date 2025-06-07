import Customer from "../models/customer.model.js";
import { async_handler } from "../utils/async_handler.js";
import { Op } from "sequelize";
import Order from "../models/order.model.js";
import Order_has_service from "../models/order_has_service.model.js";
import Service from "../models/service.model.js";

export const addCustomer = async_handler(async (req, res) => {
    const {
        name,
        email,
        ph_number,
        country_id,
        state_id,
        city_id,
        gender,
        address,
    } = req.body;
    console.log("enter the customer");

    console.log(
        name,
        email,
        ph_number,
        country_id,
        state_id,
        city_id,
        gender,
        address
    );

    const user_id = req.session?.user.id; //  user_id is stored in session
    console.log("sessio id");
    console.log(user_id);
    if (!user_id) {
        res.status(401).json({ message: "Unauthorized: User not logged in" });
        return;
    }

    if (!name || !email || !ph_number || !country_id || !state_id || !city_id) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        // Check if the customer already exists

        console.log("checking if customer exist");

        const existingCustomer = await Customer.findAll({
            where: { email: email },
        });
        console.log(existingCustomer);

        if (existingCustomer.length > 0) {
            // now check if the order is present for the same service

            res
                .status(400)
                .json({ message: "Customer already exists with this email" });
            return;
        }

        // If customer does not exist, create a new customer and order
        // Create the customer
        console.log("customer do not exist");
        console.log("creating customer");

        const customer = await Customer.create({
            name,
            email,
            ph_number,
            country_id,
            state_id,
            city_id,
            gender,
            address,
            user_id
        });
        if (!customer) {
            console.log("creation failed");
            res.status(400).json({ message: "fail to insert the customer" });
            return;
        }

        console.log("order created and so customer");
        res.status(200).json({
            message: "Customer and  created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "customer not created" });
    }
});

// export const getCustomerById = async (req, res) => {
//   const customerid = req.params.id;
//   try {
//     const customer = await Customer.findAll({ where: { id: customerid } });
//     if (!customer) {
//       res.status(400).json("not found");
//       return;
//     }
//     res.status(200).json(customer);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
export const getCustomerByName = async (req, res) => {
    try {
        const customerName = req.query.name;
        let customers;
        if (!customerName || customerName.trim() === "") {
            customers = await Customer.findAll();
        } else {
            customers = await Customer.findAll({
                where: { name: { [Op.like]: `%${customerName}%` } },
            });
        }

        if (!customers || customers.length === 0) {
            return res
                .status(404)
                .json({ success: 404, message: "No customers found with that name" });
        }
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({success: 500, message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    const customerid = req.params.id;
    const updateData = req.body;
    try {
        const [updated] = await Customer.update(updateData, {
            where: { id: customerid },
        });
        if (!updated) {
            return res
                .status(404)
                .json({ message: "Customer not found or no changes made" });
        }
        const updatedCustomer = await Customer.findByPk(customerid);
        console.log(updatedCustomer);
        res.status(200).json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    const customerid = req.params.id;
    try {
        const deleted = await Customer.destroy({ where: { id: customerid } });
        if (!deleted) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCustomerServices = async_handler(async (req, res) => {
    const customer_id = req.params.customer_id;
    try {
        //get all order of the customer
        const orders = await Order.findAll({
            where: { customer_id },
            attributes: ["id"],
        });

        const orderIds = orders.map((order) => order.id);
        if (orderIds.length === 0) {
            return res.status(400).json("no order ");
        }

        //get all order has service
        const orderHasService = await Order_has_service.findAll({
            where: { order_id: orderIds },
            attributes: ["service_id"],
        });

        const serviceIds = orderHasService.map((os) => os.service_id);
        if (serviceIds.length === 0) {
            res.status(400).json("no service for the order");
        }
        const getAllService = await Service.findAll({
            where: { id: serviceIds },
            attributes: ["id", "name", "description", "price", "validity"],
        });
        res.status(200).json(getAllService);
    } catch (error) {
        res.status(500).json("fail to fetch customer");
    }
});
