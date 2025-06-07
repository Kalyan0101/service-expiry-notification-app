import { Router } from "express";
import auth_session from "../middleware/auth.middleware.js";
import render_page from "../utils/render_page.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import OrderHasService from "../models/order_has_service.model.js";
import Customer from "../models/customer.model.js";
import Service from "../models/service.model.js";
import { all_order, create_order, delete_order } from "../controllers/order.controller.js";
import upload from "../middleware/multer.middleware.js";



const router = Router();

router.get("/", auth_session, async(req, res) => {
    const content = await render_page("order")
    const user = req.session.user;

    res.render('../views/layout.ejs', {
        title: "Order",
        body: content,
        user
    });
});

router.route("/create_order")
.get(async(req, res) => {
    const content = await render_page("create_order")
    const user = req.session.user;

    res.render('../views/layout.ejs', {
        title: "Order > Create Order",
        body: content,
        user
    });
})
.post(upload.none(), create_order)

router.get("/all_order", auth_session, all_order);

router.get("/delete_order", auth_session, delete_order);


export default router;