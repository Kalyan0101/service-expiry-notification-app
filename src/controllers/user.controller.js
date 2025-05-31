import Customer from "../models/customer.model.js";
import User from "../models/user.model.js";
import Service from "../models/service.model.js";
import Order from "../models/order.model.js";
import { async_handler } from "../utils/async_handler.js";
import bcrypt from "bcrypt"



const all_user = async_handler(async (req, res) => {
    try {

        let search = { raw: true }
        if (req.query && req.query.user_email) {
            const { user_email } = req.query;

            search.where = { email: user_email }
        }

        const users = await User.findAll(search);

        return res.status(200).json({ users })

    } catch (error) {
        return res.status(500).json(error)
    }
});


const delete_user = async_handler(async (req, res) => {
    try {

        const { user_id } = req.query;
        if (!user_id) return res.status(400).json({success: 500, message: "user id required!"});

        const is_delete = await User.destroy({
            where: {
                id: user_id
            }
        });

        if (!is_delete) return res.status(500).json({success: 500, message: "user not deleted!"});
        
        return res.status(200).json({success: 200, message: "user deleted."});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: 500, message: "user deletion failed!"});
    }
})

const update_user = async_handler(async (req, res) => {
    try {
		const { name = "", email = "", password = "", c_password = "" } = req.body; 

        if(!email) return res.status(400).json({ success: 400, message: "email required!"});
        if(password !== c_password) return res.status(400).json({ success: 400, message: "Confirm password is not matching!"});

        let replace_object = {}
        if(name) replace_object.name = name.trim();
        if(password) {
            const hash_password = bcrypt.hash(password, 10);
            replace_object.password = await hash_password;
        }

        await User.update(
            replace_object,
            {
                where: { email: email }
            }
        );

        return res.status(200).json({ success: 200, message: "Updation successfull."});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "!Updation failed"});
    }
});

const dashboard_data = async_handler(async (req, res) => {
    try {
        const dashboard_data = {};
        
        const user = await User.findAndCountAll();
        const coustomer = await Customer.findAndCountAll();
        const service = await Service.findAndCountAll();
        const order = await Order.findAndCountAll();


    } catch (error) {
        console.error(error);
        return res.status(500).json({success: 500, message: error.message});
    }
})




export { delete_user, all_user, update_user, dashboard_data }