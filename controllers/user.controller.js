import User from "../models/user.model.js";
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

        const { id } = req.body;
        if (!id) return res.status(400).json("user id required!");

        const is_delete = await User.destroy({
            where: {
                id: id
            }
        });

        console.log(is_delete);

        if (!is_delete) return res.status(500).json("user not deleted!");

        return res.status(200).redirect("/manage_user");

    } catch (error) {
        console.log(error);
    }
})

const update_user = async_handler(async (req, res) => {
    try {
		const { name = "", email = "", password = "", c_passsword = "" } = req.body;
        
        if(!email) return res.status(400).json({ message: "email required!"});
        if(password !== c_passsword) return res.status(400).json({message: "Confirm password is not matching!"});

        let replace_object = {}
        if(name) replace_object.name = name.trim();
        if(password) {
            const hash_password = bcrypt.hash(password, 10);
            replace_object.password = (await hash_password).trim();
        }

        console.log(replace_object);

        // await User.update(
        //     replace_object,
        //     {
        //         where: { email: email }
        //     }
        // );

        return res.status(200).json({message: "Updation successfull."});

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});




export { delete_user, all_user, update_user }