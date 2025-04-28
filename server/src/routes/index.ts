import { Router } from "express";
import { HomeController } from "../controllers/home";
import authRoutes from "./auth";
import userRoutes from "./user";
import studentRoutes from "./student";
import datasetRoutes from "./dataset";
import dimensionRoutes from "./dimension";
import ruleRoutes from "./rule";

const router = Router();

// Basic route
router.get("/", HomeController.welcome);

// Register auth routes
router.use("/auth", authRoutes);

// Register user routes
router.use("/user", userRoutes);

// Register student routes
router.use("/students", studentRoutes);

// Register dataset routes
router.use("/dataset", datasetRoutes);

// Register dimension routes
router.use("/dimension", dimensionRoutes);

// Register rule routes
router.use("/rule", ruleRoutes);

export default router;
