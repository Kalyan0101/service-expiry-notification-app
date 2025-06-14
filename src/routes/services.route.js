import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/services.controller.js";

import render_page from "../utils/render_page.js";
import auth_session from "../middleware/auth.middleware.js";
import { Router } from "express";
import { render } from "ejs";
const router = Router();

router.get("/", auth_session, async (req, res) => {
  const user = await req.session.user;
  const content = await render_page("manage_service", user);
  res.render("../views/layout", {
    title: "Service",
    body: content,
    user
  });
});

router.get("/add_service", auth_session, async (req, res) => {
  const user = await req.session.user;
  const content = await render_page("add_service", user);
  res.render("../views/layout", {
    title: "Add Service",
    body: content,
    user
  });
});

router.post("/create", auth_session, createService);
router.get("/getall", auth_session, getAllServices);
router.get("/getservice/:id", getServiceById);
router.put("/update/:id", auth_session, updateService);
router.delete("/delete/:id", auth_session, deleteService);

export default router;
