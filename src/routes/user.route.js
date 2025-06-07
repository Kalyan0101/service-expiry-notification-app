import { Router } from "express";
import render_page from "../utils/render_page.js";
import auth_session from "../middleware/auth.middleware.js";
import { all_user, update_user, delete_user, dashboard_data } from "../controllers/user.controller.js";
import { async_handler } from "../utils/async_handler.js";
import User from "../models/user.model.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.get('/dashboard', auth_session, async (req, res) => {
    const content = await render_page('dashboard')
    const user = await req.session.user || "";
    res.render('../views/layout', {
        title: "Dashboard",
        body: content,
        user
    })
})

router.get('/user', auth_session, async (req, res) => {
    const user = await req.session.user;    
    const content = await render_page('user', user)
    res.render('../views/layout', {
        title: "Manage User",
        body: content,
        user
    })
})

router.route("/update_user")
.get(auth_session, async (req, res) => {
    const looged_user = await req.session.user || "";

    const { user_id } = req.query;
    const user = await get_user(user_id);
    
    const content = await render_page('user_updation', user)
    res.render('../views/layout', {
        title: "User > Update User",
        body: content,
        user: looged_user
    })
})
.post(auth_session, upload.none(), update_user)

// JSON result
router.get('/all_user', auth_session, all_user);
router.get('/delete_user', auth_session, delete_user);
router.get('/dashboard_data', auth_session, dashboard_data);



const get_user = async_handler( async (user_id) => {
    try {        
        const user = await User.findByPk(user_id);
        
        return user.dataValues;
    } catch (error) {
        console.log(error);        
    }
});


export default router;
