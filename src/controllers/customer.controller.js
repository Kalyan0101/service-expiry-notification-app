import Customer from "../models/customer.model.js";
import { async_handler } from "../utils/async_handler.js";
import { Op } from "sequelize";
import Order from "../models/order.model.js";
import Order_has_service from "../models/order_has_service.model.js";

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
    service_id,
  } = req.body;

  const user_id = req.session?.user.id; //  user_id is stored in session
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
    const existingCustomer = await Customer.findAll({
      where: { email: email },
    });

    if (existingCustomer.length > 0) {
      const order = await Order.create({
        purchase_date: new Date(),
        customer_id: existingCustomer[0].id,
        user_id: user_id, // user_id is from session,
      });

      if (!order) {
        res.status(400).json({ message: "fail to insert the order" });
        return;
      }

      //create order_has_service
      const order_has_service = await Order_has_service.create({
        order_id: order.id,
        service_id: service_id,
      });

      if (!order_has_service) {
        res.status(400).json({ message: "fail to insert the order service" });
        return;
      }

      res.status(200).json({
        message: "Order created successfully for existing customer",
      });
      return;
    }
    // If customer does not exist, create a new customer and order
    // Create the customer

    const customer = await Customer.create({
      name,
      email,
      ph_number,
      country_id,
      state_id,
      city_id,
      user_id,
      gender,
      address,
      service_id,
    });
    if (!customer) {
      res.status(400).json({ message: "fail to insert the user" });
      return;
    }
    const order = await Order.create({
      purchase_date: new Date(),
      customer_id: customer.id,
      user_id: user_id, // user_id is from session,
    });
    if (!order) {
      res.status(400).json({ message: "fail to insert the order" });
      return;
    }
    //create order has service
    const order_has_service = await Order_has_service.create({
      order_id: order.id,
      service_id: service_id,
    });
    if (!order_has_service) {
      res.status(400).json({ message: "fail to insert the order service" });
      return;
    }
    res.status(200).json({
      message: "Customer and Order created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// export const getAllCustomer = async (req, res) => {
//   try {
//     const customers = await Customer.findAll();
//     if (!customers) {
//       res.status(400).json({ message: "customer not available" });
//     }
//     res.status(200).json(customers);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

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
        .json({ message: "No customers found with that name" });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(200).json(updatedCustomer);
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
