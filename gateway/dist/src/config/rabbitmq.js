"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const config = {
    url: "",
};
class Producer {
    constructor() {
        this.exchange = "orders";
    }
    channelCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield amqplib_1.default.connect(config.url);
            this.channel = c.createChannel();
        });
    }
    publishMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel)
                this.channelCreate();
            yield this.channel.assertExchange(this.exchange, "direct");
            this.channel.publish(this.exchange, "INCOMING", Buffer.from("Hello from rab"));
        });
    }
}
exports.default = Producer;
