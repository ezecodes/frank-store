import { NextFunction, Request, Response } from "express";
import { SuccessHandler } from "./response-handler";

export class OrderController {
  public createOrder(req: Request, res: Response, next: NextFunction): void {
    const response = SuccessHandler.ok({}, "Hello from the order API!");
    res.status(response.statusCode).json(response);
  }
}
