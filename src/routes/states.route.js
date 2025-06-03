import {
  createState,
  getStates,
  getStatesById,
} from "../controllers/state.controller.js";
import { Router } from "express";

const router = Router();

// Create multiple states
router.post("/createState", createState);

// Get states by country ID
router.get("/getstates/:countryid", getStates);
router.get("/getstate/:id", getStatesById);

export default router;
