import { Router } from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = Router();

// Protected routes
router.get("/profile", auth, UserController.getUserByUsername);

export default router;
