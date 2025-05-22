import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.get('/login', (req, res) => {
    
    // authController.login(req)
    
    res.render('../views/pages/login')
})

router.get('/register', (req, res) => {
    res.render('../views/pages/register')
})
router.get('/forgot_password', (req, res) => {
    res.render('../views/pages/forgot_password')
})

export default router;