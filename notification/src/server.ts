import express, { Application } from "express";
import Queue from "./queue";
import { sequelize } from "../models";

class Server {
  private app: Application;
  private port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;
    Queue.consumeCreateOrderNotifications();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }
  private initializeRoutes() {}
  private initializeErrorHandling(): void {}

  private intializeModelAssoc() {}

  public async connectDatabase() {
    try {
      await sequelize.authenticate();
      this.intializeModelAssoc();
      console.log("Notifications Database Connected");
    } catch (err) {
      throw err;
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(
        `Notification svc is running on http://localhost:${this.port}`
      );
    });
  }
}

export default Server;
