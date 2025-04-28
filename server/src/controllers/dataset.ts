import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { Dataset, IDataset } from "../models/Dataset";

export class DatasetController {
  // 创建数据集
  public static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const dataset = new Dataset({ name });
      await dataset.save();

      res.status(201).json(
        ResponseHandler.success({
          message: "数据集创建成功",
          dataset,
        })
      );
    } catch (error: any) {
      console.error("创建数据集错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error(error?.message || "创建数据集失败"));
    }
  }

  // 获取数据集列表
  public static async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, keyword } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      let query = {};
      if (keyword) {
        query = {
          name: { $regex: keyword, $options: "i" },
        };
      }

      const datasets = await Dataset.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Dataset.countDocuments(query);

      res.json(
        ResponseHandler.success({
          data: datasets,
          total,
          page: Number(page),
          limit: Number(limit),
        })
      );
    } catch (error) {
      console.error("获取数据集列表错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("获取数据集列表失败，请稍后重试"));
    }
  }

  // 获取单个数据集
  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataset = await Dataset.findById(id);

      if (!dataset) {
        return res.status(404).json(ResponseHandler.error("未找到该数据集"));
      }

      res.json(ResponseHandler.success(dataset));
    } catch (error) {
      console.error("获取数据集错误:", error);
      res.status(500).json(ResponseHandler.error("获取数据集失败，请稍后重试"));
    }
  }

  // 更新数据集
  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const dataset = await Dataset.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );

      if (!dataset) {
        return res.status(404).json(ResponseHandler.error("未找到该数据集"));
      }

      res.json(
        ResponseHandler.success({
          message: "数据集更新成功",
          dataset,
        })
      );
    } catch (error) {
      console.error("更新数据集错误:", error);
      res.status(500).json(ResponseHandler.error("更新数据集失败，请稍后重试"));
    }
  }

  // 删除数据集
  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataset = await Dataset.findByIdAndDelete(id);

      if (!dataset) {
        return res.status(404).json(ResponseHandler.error("未找到该数据集"));
      }

      res.json(
        ResponseHandler.success({
          message: "数据集删除成功",
        })
      );
    } catch (error) {
      console.error("删除数据集错误:", error);
      res.status(500).json(ResponseHandler.error("删除数据集失败，请稍后重试"));
    }
  }
}
