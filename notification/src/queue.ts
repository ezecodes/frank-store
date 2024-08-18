import rabbit, { Channel, Connection } from "amqplib";
import { rabbitmqServer } from "./config";
import { QueueExchanges, SubscriberQueues, PublisherQueues } from "./utils";
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

  public static async consumeOrderCreated() {
    await Queue.channelCreate();
    await Queue.channel?.assertQueue(SubscriberQueues.OrderCreated, {
      durable: true,
    });

    await Queue.channel?.bindQueue(
      SubscriberQueues.OrderCreated,
      QueueExchanges.DIRECT,
      SubscriberQueues.OrderCreated
    );

    Queue.channel?.consume(
      SubscriberQueues.OrderCreated,
      (msg) => {
        console.log();
        // Queue.channel?.ack(msg as any);
      },
      { noAck: false }
    );
  }
  public static async consumeUserCreated() {
    await Queue.channelCreate();
    await Queue.channel?.assertQueue(SubscriberQueues.UserCreated, {
      durable: true,
    });

    await Queue.channel?.bindQueue(
      SubscriberQueues.UserCreated,
      QueueExchanges.DIRECT,
      SubscriberQueues.UserCreated
    );

    Queue.channel?.consume(
      SubscriberQueues.UserCreated,
      (msg) => {
        console.log();
        // Queue.channel?.ack(msg as any);
      },
      { noAck: false }
    );
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
