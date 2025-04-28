import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { Student, IStudent } from "../models/Student";

export class StudentController {
  // 创建新学生
  public static async create(req: Request, res: Response) {
    try {
      const { studentId, name, age, grade, major, email, phone } = req.body;

      // 检查学号是否已存在
      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json(ResponseHandler.error("该学号已存在"));
      }

      // 创建新学生
      const student = new Student({
        studentId,
        name,
        age,
        grade,
        major,
        email,
        phone,
      });

      await student.save();

      res.status(201).json(
        ResponseHandler.success({
          message: "学生创建成功",
          student,
        })
      );
    } catch (error: any) {
      console.error("创建学生错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error(error?.message || "创建学生失败"));
    }
  }

  // 获取学生列表
  public static async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, keyword } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      let query = {};
      if (keyword) {
        query = {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { studentId: { $regex: keyword, $options: "i" } },
            { major: { $regex: keyword, $options: "i" } },
          ],
        };
      }

      const students = await Student.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Student.countDocuments(query);

      res.json(
        ResponseHandler.success({
          data: students,
          total,
          page: Number(page),
          limit: Number(limit),
          // totalPages: Math.ceil(total / Number(limit)),
        })
      );
    } catch (error) {
      console.error("获取学生列表错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("获取学生列表失败，请稍后重试"));
    }
  }

  // 获取单个学生信息
  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json(ResponseHandler.error("未找到该学生"));
      }

      res.json(ResponseHandler.success(student));
    } catch (error) {
      console.error("获取学生信息错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("获取学生信息失败，请稍后重试"));
    }
  }

  // 更新学生信息
  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      console.log(req.query);

      // 检查学号是否已被其他学生使用
      if (updateData.studentId) {
        const existingStudent = await Student.findOne({
          studentId: updateData.studentId,
          _id: { $ne: id },
        });
        if (existingStudent) {
          return res
            .status(400)
            .json(ResponseHandler.error("该学号已被其他学生使用"));
        }
      }

      const student = await Student.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!student) {
        return res.status(404).json(ResponseHandler.error("未找到该学生"));
      }

      res.json(
        ResponseHandler.success({
          message: "学生信息更新成功",
          student,
        })
      );
    } catch (error) {
      console.error("更新学生信息错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("更新学生信息失败，请稍后重试"));
    }
  }

  // 删除学生
  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return res.status(404).json(ResponseHandler.error("未找到该学生"));
      }

      res.json(
        ResponseHandler.success({
          message: "学生删除成功",
          student,
        })
      );
    } catch (error) {
      console.error("删除学生错误:", error);
      res.status(500).json(ResponseHandler.error("删除学生失败，请稍后重试"));
    }
  }
}
