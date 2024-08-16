import { Request, Response } from "express";
import { SuccessHandler } from "./response-handler";
import Queue from "./queue";
import { QueueNames } from "./utils";

export class OrderController {
  public async createOrder(req: Request, res: Response): Promise<void> {
    await Queue.publishMessage(QueueNames.NEW_ORDER, req.body);
    const response = SuccessHandler.ok({}, "Hello from the order API!");
    res.status(response.status_code).json(response);
  }
}
