import { Router } from "express";
import {
    register,
    login,
    logout,
    verified_otp,
    reset_password
} from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";
import auth_session from "../middleware/auth.middleware.js";

const router = Router();

const redirect_if_authorised = async (req, res, next) => {
    if(req.session.user){
        if(req.path === "/login" || req.path === "/register"){
            return res.redirect("/dashboard");
        }
    }
    next();
}

router.route("/register")
    .get(redirect_if_authorised, (_, res) => res.render("../views/pages/register", 
        {
            message: null,
            form_data: {}
        }
    ))
    .post(upload.none(), register);

router.route("/login")
    .get(redirect_if_authorised, (_, res) => res.render("../views/pages/login",
        {
            message: null,
            form_data: {}
        }
    ))
    .post(login);

router.route("/forgot_password")
    .get((_, res) => res.render("../views/pages/forgot_password"))
    .post(upload.none(), verified_otp);

router.route("/reset_password").post(upload.none(), reset_password);

router.route("/logout").get(auth_session, logout);

export default router;
