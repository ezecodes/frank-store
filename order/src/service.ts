import { sequelize } from "../models";
import OrderItems from "../models/OrderItems";
import Orders from "../models/Orders";
import { OrderCreation } from "./interface";
import Queue from "./queue";
import { QueueNames } from "./utils";

export default class OrderService {
  static async create_order(order: OrderCreation) {
    const data = await sequelize.transaction(async (t) => {
      const data = await Orders.create(
        {
          ...order.data.shipping_address,
          status: "pending",
          invoice_id: order.data.invoice_id,
          customer_id: order.data.customer_id,
        },
        { returning: true, transaction: t }
      );

      order.data.items.forEach(
        async (item) =>
          await OrderItems.create(
            { ...item, order_id: data.id, invoice_id: data.id },
            { returning: true, transaction: t }
          )
      );
      return data;
    });

    Queue.publishMessage(QueueNames.OrderCreated, data);
  }
}
