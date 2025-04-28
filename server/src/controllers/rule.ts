import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { Rule, IRule } from "../models/Rule";
import { Dataset } from "../models/Dataset";
import { Dimension } from "../models/Dimension";

export class RuleController {
  // 创建条例
  public static async create(req: Request, res: Response) {
    try {
      const { content, dataset, dimension } = req.body;

      // 检查数据集是否存在
      const existingDataset = await Dataset.findById(dataset);
      if (!existingDataset) {
        return res.status(400).json(ResponseHandler.error("数据集不存在"));
      }

      // 检查维度是否存在
      const existingDimension = await Dimension.findById(dimension);
      if (!existingDimension) {
        return res.status(400).json(ResponseHandler.error("维度不存在"));
      }
      // 检查维度是否属于该数据集
      if (existingDimension.dataset?.toString() !== dataset) {
        return res
          .status(400)
          .json(ResponseHandler.error("维度不属于该数据集"));
      }

      const rule = new Rule({ content, dataset, dimension });
      await rule.save();

      res.status(201).json(
        ResponseHandler.success({
          message: "条例创建成功",
          rule,
        })
      );
    } catch (error: any) {
      console.error("创建条例错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error(error?.message || "创建条例失败"));
    }
  }

  // 获取条例列表
  public static async list(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, keyword, dataset, dimension } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      let query: any = {};
      if (keyword) {
        query.content = { $regex: keyword, $options: "i" };
      }
      if (dataset) {
        query.dataset = dataset;
      }
      if (dimension) {
        query.dimension = dimension;
      }

      const rules = await Rule.find(query)
        .populate("dataset", "name")
        .populate("dimension", "name")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Rule.countDocuments(query);

      res.json(
        ResponseHandler.success({
          data: rules,
          total,
          page: Number(page),
          limit: Number(limit),
        })
      );
    } catch (error) {
      console.error("获取条例列表错误:", error);
      res
        .status(500)
        .json(ResponseHandler.error("获取条例列表失败，请稍后重试"));
    }
  }

  // 获取单个条例
  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rule = await Rule.findById(id)
        .populate("dataset", "name")
        .populate("dimension", "name");

      if (!rule) {
        return res.status(404).json(ResponseHandler.error("未找到该条例"));
      }

      res.json(ResponseHandler.success(rule));
    } catch (error) {
      console.error("获取条例错误:", error);
      res.status(500).json(ResponseHandler.error("获取条例失败，请稍后重试"));
    }
  }

  // 更新条例
  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, dataset, dimension } = req.body;

      // 检查数据集是否存在
      if (dataset) {
        const existingDataset = await Dataset.findById(dataset);
        if (!existingDataset) {
          return res.status(400).json(ResponseHandler.error("数据集不存在"));
        }
      }

      // 检查维度是否存在
      if (dimension) {
        const existingDimension = await Dimension.findById(dimension);
        if (!existingDimension) {
          return res.status(400).json(ResponseHandler.error("维度不存在"));
        }

        // 检查维度是否属于该数据集
        if (existingDimension.dataset?.toString() !== dataset) {
          return res
            .status(400)
            .json(ResponseHandler.error("维度不属于该数据集"));
        }
      }

      const rule = await Rule.findByIdAndUpdate(
        id,
        { content, dataset, dimension },
        { new: true, runValidators: true }
      )
        .populate("dataset", "name")
        .populate("dimension", "name");

      if (!rule) {
        return res.status(404).json(ResponseHandler.error("未找到该条例"));
      }

      res.json(
        ResponseHandler.success({
          message: "条例更新成功",
          rule,
        })
      );
    } catch (error) {
      console.error("更新条例错误:", error);
      res.status(500).json(ResponseHandler.error("更新条例失败，请稍后重试"));
    }
  }

  // 删除条例
  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rule = await Rule.findByIdAndDelete(id);

      if (!rule) {
        return res.status(404).json(ResponseHandler.error("未找到该条例"));
      }

      res.json(
        ResponseHandler.success({
          message: "条例删除成功",
        })
      );
    } catch (error) {
      console.error("删除条例错误:", error);
      res.status(500).json(ResponseHandler.error("删除条例失败，请稍后重试"));
    }
  }
}
