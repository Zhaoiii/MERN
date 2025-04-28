import { Router } from "express";
import { DatasetController } from "../controllers/dataset";
import { auth } from "../middleware/auth";

const router = Router();

// 数据集管理路由
router.post("/", auth, DatasetController.create);
router.get("/", auth, DatasetController.list);
router.get("/:id", auth, DatasetController.getById);
router.put("/:id", auth, DatasetController.update);
router.delete("/:id", auth, DatasetController.delete);

export default router;
