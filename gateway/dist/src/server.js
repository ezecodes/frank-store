"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app_registers_1 = require("./middlewares/app-registers");
const errors_1 = require("./middlewares/errors");
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeMiddlewares() {
        this.app.use(app_registers_1.httpLogger);
        this.app.use((0, app_registers_1.corsConfig)());
        this.app.use(express_1.default.json());
        this.app.use((0, app_registers_1.csp)());
    }
    initializeRoutes() {
        const apiRoutes = new index_1.default();
        this.app.use("/api", apiRoutes.router);
    }
    initializeErrorHandling() {
        this.app.use(errors_1.notFoundMiddleware);
        this.app.use(errors_1.errorMiddleware);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
exports.default = Server;
