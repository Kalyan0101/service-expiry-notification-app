import User from "../models/User.model.js";


class Auth {
    async login(req, res) {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json("email and password both are required!");
        }

        User.findAll({
            where: {
                email: email
            },
        });

    }

    async signup() { }

    async forgot_password() { }

    async logout() { }
}

export default new Auth();