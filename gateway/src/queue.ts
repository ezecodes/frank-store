import rabbit, { Channel, Connection } from "amqplib";
import { rabbitmqServer } from "./config";
import { QueueExchanges, QueueNames } from "./utils";

export default class Queue {
  public static channel: Channel | null = null;
  public static connection: Connection | null = null; // Make connection static

  public static async channelCreate(): Promise<void> {
    try {
      if (!Queue.connection) {
        Queue.connection = await rabbit.connect(rabbitmqServer); // Use Queue.connection
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
    Queue.channel?.publish(
      QueueExchanges.DIRECT,
      queue,
      Buffer.from(JSON.stringify(data))
    );
  }

  public async closeConnection(): Promise<void> {
    if (Queue.channel) {
      await Queue.channel.close();
    }
    if (Queue.connection) {
      // Use Queue.connection
      await Queue.connection.close();
    }
  }
}
