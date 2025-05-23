import User from "../models/User.model.js";


const register = async (req, res) =>{}

const login = async (req, res) => {

  console.log(req.body);
  const { email, password } = req.body;

  return 0;

  if (!email || !password) {
    res.status(400).json("email and password both are required!");
  }

  User.findAll({
    where: {
      email: email,
    },
  });
};

const signup = async (req, res) => {};

const forgot_password = (req, res) => {};

const logout = (req, res) => {};

export { 
    register, 
    login, 
    signup, 
    forgot_password, 
    logout 
};