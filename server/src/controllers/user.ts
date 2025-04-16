import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";

export class UserController {
  public static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Check if username exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res
          .status(400)
          .json(ResponseHandler.error("Username already exists"));
      }

      // Check if email exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res
          .status(400)
          .json(ResponseHandler.error("Email is already registered"));
      }

      // create user
      const user = new User({
        username,
        email,
        password,
      });

      await user.save();

      // return user information
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };

      res.status(201).json(
        ResponseHandler.success({
          message: "User registration successful",
          user: userResponse,
        })
      );
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json(
          ResponseHandler.error("Registration failed, please try again later")
        );
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        $or: [{ username }, { email: username }],
      });

      if (!user) {
        return res
          .status(401)
          .json(ResponseHandler.error("Invalid username/email or password"));
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json(ResponseHandler.error("Invalid username/email or password"));
      }

      // generate token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      // return user information
      const userResponse = {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };

      res.json(
        ResponseHandler.success({
          message: "Login successful",
          user: userResponse,
          token,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json(ResponseHandler.error("Login failed, please try again later"));
    }
  }

  public static async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }).select("-password");

      if (!user) {
        return res.status(404).json(ResponseHandler.error("User not found"));
      }

      res.json(ResponseHandler.success(user));
    } catch (error) {
      console.error("User query error:", error);
      res
        .status(500)
        .json(
          ResponseHandler.error("Failed to query user, please try again later")
        );
    }
  }
}
