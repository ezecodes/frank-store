import { Router } from "express";
import { OrderController } from "./controller";
import { zodErrors } from "./middleware";
import { z } from "zod";
import { Request } from "express";

const createOrderSchema = z.object({
  product_id: z
    .string({ message: "Missing Product ID" })
    .uuid({ message: "Invalid Product ID" }),
  quantity: z
    .number({ message: "Missing product quantity" })
    .min(1, { message: "Product quantity must not be greater than one" }),
  delivery_date: z.date().optional(),
});

export default class ApiRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  protected initializeRoutes(): void {
    const orderController = new OrderController();
    this.router
      .route("/order")
      .post(
        (req: Request) => createOrderSchema.parse(req.body),
        zodErrors,
        orderController.createOrder
      );
  }
}
