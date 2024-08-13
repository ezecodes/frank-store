import { NextFunction, Request, Response } from "express";
import { SuccessHandler } from "./response-handler";
import Producer from "./queue";
import { QueueExchanges, QueueNames } from "./utils";

export class OrderController {
  private producer: Producer;
  constructor() {
    this.producer = new Producer();
  }

  public createOrder(req: Request, res: Response, next: NextFunction): void {
    this.producer.publishMessage(
      QueueExchanges.DIRECT,
      QueueNames.NEW_ORDER,
      req.body
    );
    const response = SuccessHandler.ok({}, "Hello from the order API!");
    res.status(response.statusCode).json(response);
  }
}
