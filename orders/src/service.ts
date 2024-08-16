import Orders from "../models/Orders";
import { OrderCreation } from "./interface";
import Queue from "./queue";
import { QueueNames } from "./utils";

export default class OrderService {
  static async create_order(order: OrderCreation) {
    const data = await Orders.create(
      {
        ...order.data.shipping_address,
        status: "pending",
        invoice_id: order.data.invoice_id,
        customer_id: order.data.customer_id,
      },
      { returning: true }
    );
    Queue.publishMessage(QueueNames.OrderNotifications, data);
  }
}
