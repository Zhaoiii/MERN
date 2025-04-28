import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { Dimension, IDimension } from "../models/Dimension";
import { Dataset } from "../models/Dataset";

export class DimensionController {
  // 创建维度
  public static async create(req: Request, res: Response) {
    try {
      const { name, dataset } = req.body;

      // 检查数据集是否存在
      const existingDataset = await Dataset.findById(dataset);
      if (!existingDataset) {
        return res.status(400).json(ResponseHandler.error("数据集不存在"));
      }

      const dimension = new Dimension({ name, dataset });
      await dimension.save();

      res.status(201).json(
        ResponseHandler.success({
          message: "维度创建成功",
          dimension,
        })
      );
    } catch (error: any) {
      console.error("创建维度错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error(error?.message || "创建维度失败"));
    }
  }

  // 获取维度列表
  public static async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, keyword, dataset } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      let query: any = {};
      if (keyword) {
        query.name = { $regex: keyword, $options: "i" };
      }
      if (dataset) {
        query.dataset = dataset;
      }

      const dimensions = await Dimension.find(query)
        .populate("dataset", "name")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Dimension.countDocuments(query);

      res.json(
        ResponseHandler.success({
          data: dimensions,
          total,
          page: Number(page),
          limit: Number(limit),
        })
      );
    } catch (error) {
      console.error("获取维度列表错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("获取维度列表失败，请稍后重试"));
    }
  }

  // 获取单个维度
  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dimension = await Dimension.findById(id).populate(
        "dataset",
        "name"
      );

      if (!dimension) {
        return res.status(404).json(ResponseHandler.error("未找到该维度"));
      }

      res.json(ResponseHandler.success(dimension));
    } catch (error) {
      console.error("获取维度错误:", error);
      res.status(500).json(ResponseHandler.error("获取维度失败，请稍后重试"));
    }
  }

  // 更新维度
  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, dataset } = req.body;

      // 检查数据集是否存在
      if (dataset) {
        const existingDataset = await Dataset.findById(dataset);
        if (!existingDataset) {
          return res.status(400).json(ResponseHandler.error("数据集不存在"));
        }
      }

      const dimension = await Dimension.findByIdAndUpdate(
        id,
        { name, dataset },
        { new: true, runValidators: true }
      ).populate("dataset", "name");

      if (!dimension) {
        return res.status(404).json(ResponseHandler.error("未找到该维度"));
      }

      res.json(
        ResponseHandler.success({
          message: "维度更新成功",
          dimension,
        })
      );
    } catch (error) {
      console.error("更新维度错误:", error);
      res.status(500).json(ResponseHandler.error("更新维度失败，请稍后重试"));
    }
  }

  // 删除维度
  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dimension = await Dimension.findByIdAndDelete(id);

      if (!dimension) {
        return res.status(404).json(ResponseHandler.error("未找到该维度"));
      }

      res.json(
        ResponseHandler.success({
          message: "维度删除成功",
        })
      );
    } catch (error) {
      console.error("删除维度错误:", error);
      res.status(500).json(ResponseHandler.error("删除维度失败，请稍后重试"));
    }
  }
}
