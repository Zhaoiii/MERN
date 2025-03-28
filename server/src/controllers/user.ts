import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

export class UserController {
  public static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // 检查用户名是否已存在
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json(ResponseHandler.error("用户名已存在"));
      }

      // 检查邮箱是否已存在
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json(ResponseHandler.error("邮箱已被注册"));
      }

      // 创建新用户
      const user = new User({
        username,
        email,
        password,
      });

      await user.save();

      // 返回用户信息（不包含密码）
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };

      res.status(201).json(
        ResponseHandler.success({
          message: "用户注册成功",
          user: userResponse,
        })
      );
    } catch (error) {
      console.error("注册错误:", error);
      res.status(500).json(ResponseHandler.error("注册失败，请稍后重试"));
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // 查找用户
      const user = await User.findOne({
        $or: [{ username }, { email: username }],
      });

      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json(ResponseHandler.error("用户名/邮箱或密码错误"));
      }

      // 验证密码
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json(ResponseHandler.error("用户名/邮箱或密码错误"));
      }

      // 生成JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      // 返回用户信息和token
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };

      res.json(
        ResponseHandler.success({
          // message: "登录成功",
          user: userResponse,
          token,
        })
      );
    } catch (error) {
      console.error("登录错误:", error);
      res.status(500).json(ResponseHandler.error("登录失败，请稍后重试"));
    }
  }

  public static async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password");

      if (!user) {
        return res.status(404).json(ResponseHandler.error("用户不存在"));
      }

      res.json(ResponseHandler.success(user));
    } catch (error) {
      console.error("查询用户错误:", error);
      res.status(500).json(ResponseHandler.error("查询用户失败，请稍后重试"));
    }
  }
}
