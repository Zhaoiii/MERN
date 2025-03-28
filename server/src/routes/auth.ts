import { Router } from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = Router();

// Authentication routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected routes
router.get("/profile", auth, UserController.getUserByUsername);

export default router;
