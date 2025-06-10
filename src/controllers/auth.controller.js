import User from "../models/user.model.js";
import { async_handler } from "../utils/async_handler.js";
import bcrypt, { hash } from "bcrypt"
import { sendOtpEmail } from "../utils/send_mail.js";

const generate_OTP = () => {

	const str = "0123456789";
	let otp = "";

	for(let i = 0; i < 6; i++){
		otp += str.charAt(Math.floor(Math.random() * str.length ))
	}

	return otp;
};


const register = async_handler(async (req, res) => {
	try {
		const { name = "", email = "", password = "", c_passsword = "" } = req.body;

		if ([name, email, password, c_passsword].some((field) => field?.trim() === "")) {
			return res.render("../views/pages/register.ejs",
				{
					message: "***All fields are required!",
					form_data: {}
				}
			)
		}

		if (password !== c_passsword) {
			return res.render("../views/pages/register.ejs",
				{
					message: "***Confirm password not matched!",
					form_data: { name, email }
				}
			)
		}

		const is_exists = await User.findOne({ where: { email: email } });
		if (is_exists) {
			return res.render("../views/pages/login.ejs",
				{
					message: "user already exists!",
					form_data: { name, email }
				}
			);
		}

		const hash_password = await bcrypt.hash(password, 10);

		await User.create({
			name: name.trim(),
			email: email.trim(),
			password: hash_password
		})

		return res.redirect("/auth/login");

	} catch (error) {

		console.log(error); // FLAG:		

		return res.render("../views/pages/register.ejs",
			{
				message: "User Registration failed!",
				form_data: {}
			}
		)
	}
});

const login = async_handler(async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.render("../views/pages/login.ejs",
				{
					message: "***email and password both are required!",
					form_data: {}
				}
			)
		}

		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			return res.render("../views/pages/login.ejs",
				{
					message: "***User not found!",
					form_data: { email }
				}
			);
		}
		const is_password_match = await bcrypt.compare(password, user.dataValues.password);
		if (!is_password_match) {

			return res.render("../views/pages/login.ejs",
				{
					message: "***Wrong password!",
					form_data: { email }
				}
			);
		}

		delete user?.dataValues?.password;

		// storing user data into session
		req.session.user = user.dataValues;
		req.session.save((err) => {
			if (err) {
				console.error("Error saving session:", err);
				return;
			} else {
				console.log("Session saved successfully.");
			}

			return res.redirect("/dashboard");
		});


	} catch (error) {
		return res.render("../views/pages/login.ejs",
			{
				message: error.message,
				form_data: {}
			}
		)
	}
});

const verified_otp = async_handler(async (req, res) => {
	try {
		console.log(req.body);

		if (req.body && req.body.email && !req.body.otp) {

			const { email } = req.body;

			const user = await User.findOne({ where: { email: email } });
			if (!user) return res.status(400).json({ status: 400, message: "Email not found!" });

			const otp = generate_OTP();
			req.session.otp = { otp: otp, email: email };
			req.session.save(async (err) => {
				if (err) {
					return res.status(500).json({ success: 500, message: err })
				}
				const mail = await sendOtpEmail(email, otp);

				return res.json({ success: 200, message: "otp send successfully." });
			})
		}
		if (req.body && req.body.otp) {

			console.log(req.session.otp);

			const user_otp = req.body.otp;
			const user_email = req.body.email;

			const saved_otp = req.session.otp.otp;
			const saved_email = req.session.otp.email;

			if(saved_otp !== user_otp && user_email !== saved_email){
				return res.json({ status: 400, message: "otp not matching!" });
			}

			return res.json({ success: 200, message: "otp verified" });
		}

	} catch (error) {
		console.log(error);		
		return res.status(400).json({ status: 400, message: error.message })
	}
});

const reset_password = async_handler(async (req, res) => {
	try {
		const { email } = req.session.otp;
		const { password } = req.body;

		if(!password) return res.json({ message: "password must required!" });

		const user = await User.findOne({ where: { email: email } })
		if(!user) return res.json({ success: 500, message: "email not found" })

		const hash_password = await bcrypt.hash(password, 10);

		user.password = hash_password;
		user.save();

		return res.json({ success: 200, message: "Password reset Successfully." })

	} catch (error) {
		console.log(error);
		return res.json({ status: 400, message: error.message })
	}
});

const logout = async_handler(async (req, res) => {

	req.session.destroy((err) => {
		console.log(err);
		return res.json(true)
	})
});



export { register, login, verified_otp, reset_password, logout };