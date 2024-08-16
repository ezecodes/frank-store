import express, { Application } from "express";

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

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Invoice svc is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
