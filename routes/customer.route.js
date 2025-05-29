import { Router } from "express";
import {
  addCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer
} from "../controllers/customer.controller.js";
const router = Router();

router.post("/addCustomer", addCustomer);

router.get("/getallcustomer", getAllCustomer);
router.get("/getcustomer/:id", getAllCustomer);
router.put('/updatecustomer/:id',updateCustomer)
router.delete('/deletecustomer/:id',deleteCustomer);

export default router
