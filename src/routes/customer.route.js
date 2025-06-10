import { Router } from "express";
import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByName,
  getCustomerServices,
} from "../controllers/customer.controller.js";
import { getDayfromExpirydata } from "../controllers/dashboard.controller.js";
import auth_session from "../middleware/auth.middleware.js";
import render_page from "../utils/render_page.js";
const router = Router();

router.get("/", auth_session, async (req, res) => {
  const user = await req.session.user;
  const content = await render_page("customer", user);
  res.render("../views/layout", {
    title: "Customer",
    body: content,
    user
  });
});

router.get("/add_customer", auth_session, async (req, res) => {
  const user = await req.session.user;
  const content = await render_page("add_customer", user);
  res.render("../views/layout", {
    title: "Add Customer",
    body: content,
    user
  });
});

router.post("/create", auth_session, addCustomer);

router.get("/getCustomerByName", auth_session, getCustomerByName);
router.put("/edit_customer/:id", auth_session, updateCustomer);
router.delete("/deletecustomer/:id", auth_session, deleteCustomer);
router.get("/getservices/:customer_id", getCustomerServices);
router.get("/getcustomer/expiry/:day", getDayfromExpirydata);

export default router;