import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ResponseHandler } from "../utils/response";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json(ResponseHandler.error("Authentication token is required"));
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
      email: string;
    };

    req.params = {
      ...req.params,
      requestUserId: decoded.id,
      requestUserEmail: decoded.email,
      requestUsername: decoded.username,
    };
    next();
  } catch (error) {
    res.status(401).json(ResponseHandler.error("Invalid token"));
  }
};
