import { Router } from "express";
import { HomeController } from "../controllers/home";
import authRoutes from "./auth";

const router = Router();

// Basic route
router.get("/", HomeController.welcome);

// Register auth routes
router.use("/auth", authRoutes);

export default router;
