"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = __importDefault(require("../controllers/order"));
const errors_1 = require("../middlewares/errors");
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    productId: zod_1.z
        .string({ message: "Missing Product ID" })
        .uuid({ message: "Invalid Product ID" }),
    quantity: zod_1.z
        .number({ message: "Missing product quantity" })
        .min(1, { message: "Product quantity must not be greater than one" }),
    deliveryDate: zod_1.z.date().optional(),
});
class ApiRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const orderController = new order_1.default();
        this.router
            .route("/order")
            .post((req) => createOrderSchema.parse(req.body), errors_1.zodErrors, orderController.createOrder);
    }
}
exports.default = ApiRoutes;
