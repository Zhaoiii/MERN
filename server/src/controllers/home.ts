import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response";

export class HomeController {
  public static welcome(req: Request, res: Response) {
    res.json(
      ResponseHandler.success({
        message: "Welcome to the MERN stack application",
      })
    );
  }
}
