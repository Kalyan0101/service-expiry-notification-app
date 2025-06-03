import {
  createCity,
  getCitiesByState,
  getCitiesById,
} from "../controllers/city.controller.js";
import { Router } from "express";
const router = Router();

router.post("/createcity", createCity);
router.get("/getcity/:id", getCitiesByState);
router.get("/get/city/:id", getCitiesById);

export default router;
