import { Router } from "express";
import {
    register,
    login,
    logout,
    forgot_password,
} from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";
import auth_session from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register")
    .get((_, res) => res.render("../views/pages/register", 
        {
            message: null,
            form_data: {}
        }
    ))
    .post(upload.none(), register);

router.route("/login")
    .get((_, res) => res.render("../views/pages/login",
        {
            message: null,
            form_data: {}
        }
    ))
    .post(login);

router.route("/forgot_password")
    .get((_, res) => res.render("../views/pages/forgot_password"))
    .post(forgot_password);

router.route("/logout").get(auth_session, logout);

export default router;
