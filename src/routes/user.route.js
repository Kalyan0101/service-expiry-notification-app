import { Router } from "express";
import render_page from "../utils/render_page.js";
import auth_session from "../middleware/auth.middleware.js";
import { all_user, update_user } from "../controllers/user.controller.js";


const router = Router();

router.get('/dashboard', auth_session, async (req, res) => {
    const content = await render_page('dashboard')
    res.render('../views/layout', {
        title: "Dashboard",
        body: content
    })
})

router.get('/manage_user', auth_session, async (req, res) => {
    const content = await render_page('manage_user')
    res.render('../views/layout', {
        title: "Manage User",
        body: content
    })
})

router.get('/customer', auth_session, async (req, res) => {
    const content = await render_page('customer')
    res.render('../views/layout', {
        title: "Customer",
        body: content
    })
})

router.get('/add_customer', auth_session, async (req, res) => {
    const content = await render_page('add_customer')
    res.render('../views/layout', {
        title: "Add Customer",
        body: content
    })
})

router.route("/update_user")
.get(async (req, res) => {
    const content = await render_page('user_updation')
    res.render('../views/layout', {
        title: "Update User",
        body: content
    })
})
.post(update_user)

// json result
router.get('/all_user', auth_session, all_user);


export default router;