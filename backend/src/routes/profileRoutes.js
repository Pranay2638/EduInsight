import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.get("/", protect, getProfile);

export default profileRouter;