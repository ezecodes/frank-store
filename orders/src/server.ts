import express, { Application } from "express";
import Consumer from "./queue";

class Server {
  private app: Application;
  private port: number;
  private consumer: Consumer;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.consumer = new Consumer();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeConsumers();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }
  private initializeRoutes() {}
  private initializeErrorHandling(): void {}
  private initializeConsumers(): void {
    this.consumer.consumeNewOrderMessage();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Order svc is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
