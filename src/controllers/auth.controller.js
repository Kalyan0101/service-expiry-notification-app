import User from "../models/user.model.js";
import { async_handler } from "../utils/async_handler.js";
import bcrypt from "bcrypt"
import render_page from "../utils/render_page.js";

const generate_OTP = () => {
	return Math.ceil(Math.random() * 6);
}

const register = async_handler(async (req, res) => {

	try {
		const { name = "", email = "", password = "" } = req.body;
	
		if ([name, email, password].some((field) => field?.trim() === "")) {
			// throw new Error("Both fields are required!");
			return res.status(400).json("Both fields are required!");
		}
	
		const is_exists = await User.findOne({ where: { email: email } });
		if (is_exists) {
			return res.status(400).render(
				"../views/pages/login.ejs", 
				{ 
					status: 400, 
					message: "user already exists!" 
				});
		}
	
		const hash_password = await bcrypt.hash(password, 10);
	
		const user = await User.create({
			name: name.trim(),
			email: email.trim(),
			password: hash_password
		})
	
		delete user?.dataValues?.password;
	
		return res.status(201).render('../views/layout', {
	        title: "Dashboard",
	        body: await render_page('dashboard', { status: 201, user: user.dataValues} )
	    })

	} catch (error) {
		return res.status(500).render("../views/layout", {
			title: "Register",
			body: await render_page('register', { status: 500, message: "User Registration failed!"})
		})
	}
});

const login = async_handler(async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;
	
		if (!email || !password) {
			res.status(400).json("email and password both are required!");
		}
	
		const user = User.findAll({ where: { email: email }});
		if(!user) return res.status(404).json({ status: 404, message: "User not exists!" })

		const is_password_match = await bcrypt.compare(password, user.password);
		if(!is_password_match) return res.status(400).json({ status: 400, message: "Wrong password!" });

		// session and token implementation
		// const cookie_options = {
		// 	secure: true,
		// 	httpOnly: true
		// }

		return res.status(200)
			// .cookie("token", token, cookie_options)
			.json({ status: 200, message: "Login successful." });

	} catch (error) {
		return res.status(400).json({ status: 400, message: error.message });
	}
});

const forgot_password = async_handler(async (req, res) => {
	try {
		
		console.log(req.body);
		

		const { email } = req.body;

		const user = await User.findOne({ where: { email: email }});
		if(!user) return res.status(400).json({ status: 400, message: "Email not found!"});

		return res.status(200).json({ status: 200, message: "password reset" });

	} catch (error) {
		return res.status(400).json({ status: 400, message: error.message })
	}
});

const logout = async_handler(async (req, res) => {});

export { register, login, forgot_password, logout };
