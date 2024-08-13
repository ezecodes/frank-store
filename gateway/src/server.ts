import express, { Application } from "express";
import ApiRoutes from "./route";
import {
  corsConfig,
  csp,
  httpLogger,
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware";

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
    this.app.use(httpLogger);
    this.app.use(corsConfig());
    this.app.use(express.json());
    this.app.use(csp());
  }
  private initializeRoutes() {
    const apiRoutes = new ApiRoutes();
    this.app.use("/api", apiRoutes.router);
  }
  private initializeErrorHandling(): void {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Gateway running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
