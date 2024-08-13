import rabbit, { Channel, Connection } from "amqplib";
import { rabbitmqServer } from "./config";
import { QueueExchanges, QueueNames } from "./utils";
export default class Queue {
  public static channel: Channel | null = null;
  public static connection: Connection | null = null;

  public static async channelCreate(): Promise<void> {
    try {
      if (!Queue.connection) {
        Queue.connection = await rabbit.connect(rabbitmqServer);
        console.log("Connected to RabbitMQ server.");
      }

      if (!Queue.channel) {
        Queue.channel = await Queue.connection.createChannel();
      }
    } catch (err: Error | any) {
      console.error("Failed to create channel or connection:", err);
      throw err;
    }
  }

  public static async publishMessage(
    queue: QueueNames,
    data: any
  ): Promise<void> {
    await Queue.channelCreate();

    await Queue.channel?.assertExchange(QueueExchanges.DIRECT, "direct");
    Queue.channel?.publish(QueueExchanges.DIRECT, queue, Buffer.from(data));
  }

  public static async consumeNewOrderMessage() {
    await Queue.channelCreate();
    await Queue.channel?.assertQueue(QueueNames.NEW_ORDER, {
      durable: true,
    });

    await Queue.channel?.bindQueue(
      QueueNames.NEW_ORDER,
      QueueExchanges.DIRECT,
      "error"
    );

    Queue.channel?.consume(QueueNames.NEW_ORDER, (msg) => {
      console.log(msg);
    });
  }

  public async closeConnection(): Promise<void> {
    if (Queue.channel) {
      await Queue.channel.close();
    }
    if (Queue.connection) {
      await Queue.connection.close();
    }
  }
}
