import express from "express";
import protect from "../middleware/authMiddleware.js";
import { registerUser, loginUser, getCurrentUser, googleLogin} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/google", googleLogin);

authRouter.get("/me",protect,getCurrentUser)

export default authRouter;