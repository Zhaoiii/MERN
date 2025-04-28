import { Router } from "express";
import { RuleController } from "../controllers/rule";
import { auth } from "../middleware/auth";

const router = Router();

// 条例管理路由
router.post("/", auth, RuleController.create);
router.get("/", auth, RuleController.list);
router.get("/:id", auth, RuleController.getById);
router.put("/:id", auth, RuleController.update);
router.delete("/:id", auth, RuleController.delete);

export default router;
