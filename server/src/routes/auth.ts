import { Router } from "express";
import { UserController } from "../controllers/user";

const router = Router();

// Authentication routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
