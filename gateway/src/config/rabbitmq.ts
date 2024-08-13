import rabbit from "amqplib";
const config = {
  url: "",
};

class Producer {
  channel: any;
  exchange: string;
  constructor() {
    this.exchange = "orders";
  }
  async channelCreate(): Promise<void> {
    const c = await rabbit.connect(config.url);
    this.channel = c.createChannel();
  }

  async publishMessage(): Promise<void> {
    if (!this.channel) this.channelCreate();
    await this.channel.assertExchange(this.exchange, "direct");
    this.channel.publish(
      this.exchange,
      "INCOMING",
      Buffer.from("Hello from rab")
    );
  }
}
export default Producer;
