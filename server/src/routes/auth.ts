import { Router } from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/auth";
import { registerRateLimit } from "../middleware/rateLimit";

const router = Router();

// Authentication routes
router.post("/register", registerRateLimit, UserController.register);
router.post("/login", UserController.login);

// Protected routes
router.get("/profile", auth, UserController.getUserByUsername);

export default router;
