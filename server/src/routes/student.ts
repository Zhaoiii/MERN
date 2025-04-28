import { Router } from "express";
import { StudentController } from "../controllers/student";
import { auth } from "../middleware/auth";

const router = Router();

// 学生管理路由
router.post("/", auth, StudentController.create);
router.get("/", auth, StudentController.list);
router.get("/:id", auth, StudentController.getById);
router.put("/:id", auth, StudentController.update);
router.delete("/:id", auth, StudentController.delete);

export default router;
