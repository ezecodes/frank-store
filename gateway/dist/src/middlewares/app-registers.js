"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csp = csp;
exports.corsConfig = corsConfig;
exports.httpLogger = httpLogger;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
function corsConfig() {
    return (0, cors_1.default)({
        origin: [],
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
        optionsSuccessStatus: 200,
    });
}
function csp() {
    return (0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                connectSrc: ["'self'"],
                frameSrc: ["'self'"],
                styleSrc: ["'self'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'"],
            },
        },
        frameguard: {
            action: "deny",
        },
        noSniff: true,
    });
}
function httpLogger(req, res, next) {
    var _a;
    const statusColor = res.statusCode >= 400 ? chalk_1.default.red : chalk_1.default.green;
    const startHrTime = process.hrtime();
    const ipAddr = req.headers["x-forwarded-for"] || ((_a = req.connection) === null || _a === void 0 ? void 0 : _a.remoteAddress);
    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        console.log(`${ipAddr} - ${chalk_1.default.blue(req.method)} ${chalk_1.default.cyan(req.url)} [${statusColor(res.statusCode)}] - ${chalk_1.default.yellow(elapsedTimeInMs.toFixed(3))} ms`);
    });
    next();
}
