import express, { Application } from "express";
import { sequelize } from "../models";
import Orders from "../models/Orders";
import OrderItems from "../models/OrderItems";

class Server {
  private app: Application;
  private port: number;
  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }
  private initializeRoutes() {}
  private initializeErrorHandling(): void {}

  private intializeModelAssoc() {
    Orders.hasMany(OrderItems, { foreignKey: "order_id" });
    OrderItems.belongsTo(Orders, { foreignKey: "order_id" });
  }

  public async connectDatabase() {
    try {
      await sequelize.authenticate();
      this.intializeModelAssoc();
      console.log("Orders Database Connected");
    } catch (err) {
      throw err;
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Order svc is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
