import rabbit, { Channel, Connection } from "amqplib";
import { rabbitmqServer } from "./config";
import { QueueExchanges, QueueNames } from "./utils";

export default class Consumer {
  private channel: Channel | null = null;
  private connection: Connection | null = null;

  private async channelCreate(): Promise<void> {
    if (!this.connection) {
      this.connection = await rabbit.connect(rabbitmqServer);
    }

    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }
  }

  public async publishMessage(
    exchange: QueueExchanges,
    queue: QueueNames,
    data: any
  ): Promise<void> {
    if (!this.channel) {
      await this.channelCreate();
    }

    await this.channel?.assertExchange(exchange, "direct");
    this.channel?.publish(exchange, queue, Buffer.from(data));
  }

  public async consumeNewOrderMessage() {
    await this.channel?.assertQueue(QueueNames.NEW_ORDER, {
      durable: true, // Makes the queue survive broker restarts
    });

    // Binding the queue to an exchange
    await this.channel?.bindQueue(
      QueueNames.NEW_ORDER,
      QueueExchanges.DIRECT,
      "error"
    );

    this.channel?.consume(QueueNames.NEW_ORDER, (msg) => {});
  }

  // Graceful shutdown (optional)
  public async closeConnection(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
