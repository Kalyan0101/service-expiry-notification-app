import { Router } from "express";
import {
  recentctivity,
  dashboard_stats,
  getServiceByCount,
} from "../controllers/dashboard.controller.js";
import render_page from "../utils/render_page.js";
import auth_session from "../middleware/auth.middleware.js";

const router = Router();

router.get("/dashboard", auth_session, async (req, res) => {
  const content = await render_page("dashboard");
  const user = (await req.session.user) || "";
  res.render("../views/layout", {
    title: "Dashboard",
    body: content,
    user,
  });
});

router.get("/dashboard_stats", dashboard_stats);

router.get("/recent_activity", recentctivity);
router.get("/service_frequency", getServiceByCount);

export default router;
