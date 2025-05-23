import { Router } from "express";
import {
  register,
  login,
  logout,
  forgot_password,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register")
  .get((_, res) => res.render("../views/pages/register"))
  .post(register);

router.route("/login")
  .get((_, res) => res.render("../views/pages/login"))
  .post(login);

router.route("/forgot_password")
    .get((_, res) => res.render("../views/pages/forgot_password"))
    .post(forgot_password);

router.route("/logout").post(logout);

export default router;
