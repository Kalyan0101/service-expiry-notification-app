import { Router } from "express";
import render_page from "../utils/render_page.js";

const router = Router();

router.get('/', async (req, res) => {
    const content = await render_page('dashboard')
    res.render('../views/layout', {
        title: "Dashboard",
        body: content
    })
})
router.get('/manage_user', async (req, res) => {
    const content = await render_page('manage_user')
    res.render('../views/layout', {
        title: "Manage User",
        body: content
    })
})

router.get('/add_user', async (req, res) => {
    const content = await render_page('add_user')
    res.render('../views/layout', {
        title: "Add User",
        body: content
    })
})

export default router;