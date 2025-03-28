import { Router } from "express";
import { HomeController } from "../controllers/home";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = Router();

// Basic route
router.get("/", HomeController.welcome);

// Register auth routes
router.use("/auth", authRoutes);

router.use("/user", userRoutes);

export default router;
