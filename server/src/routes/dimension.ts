import { Router } from "express";
import { DimensionController } from "../controllers/dimension";
import { auth } from "../middleware/auth";

const router = Router();

// 维度管理路由
router.post("/", auth, DimensionController.create);
router.get("/", auth, DimensionController.list);
router.get("/:id", auth, DimensionController.getById);
router.put("/:id", auth, DimensionController.update);
router.delete("/:id", auth, DimensionController.delete);

export default router;
