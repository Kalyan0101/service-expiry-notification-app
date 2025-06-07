import {
  createCountry,
  getAllCountry,
  getCountryById,
} from "../controllers/country.controller.js";

import { Router } from "express";
const router = Router();

router.post("/createcountry", createCountry);
router.get("/getcountries", getAllCountry);
router.get("/getcountry/:id", getCountryById);

export default router;
