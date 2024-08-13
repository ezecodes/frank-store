"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success_1 = require("../response-handlers/success");
class OrderController {
    createOrder(req, res, next) {
        const response = success_1.SuccessHandler.ok({}, "Hello from the order API!");
        res.status(response.statusCode).json(response);
    }
}
exports.default = OrderController;
