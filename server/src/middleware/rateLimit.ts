import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../utils/response";

interface RateLimitInfo {
  count: number;
  firstAttempt: number;
}

const ipRegistry = new Map<string, RateLimitInfo>();

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

export const registerRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();

  let rateLimitInfo = ipRegistry.get(ip);

  if (!rateLimitInfo || now - rateLimitInfo.firstAttempt > WINDOW_MS) {
    rateLimitInfo = {
      count: 1,
      firstAttempt: now,
    };
    ipRegistry.set(ip, rateLimitInfo);
    return next();
  }

  if (rateLimitInfo.count >= MAX_REQUESTS) {
    return res.status(429).json(ResponseHandler.error(`Please and Thank you`));
  }

  rateLimitInfo.count++;
  ipRegistry.set(ip, rateLimitInfo);
  next();
};
