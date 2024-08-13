"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const utils_1 = require("../utils");
class ApiError extends Error {
    constructor(message, statusCode, errorCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode !== null && errorCode !== void 0 ? errorCode : utils_1.ErrorCodes.GENERAL_INTERNAL_ERROR;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
    static badRequest(message, errorCode) {
        return new ApiError(message, 400, errorCode);
    }
    static unauthorized(message) {
        return new ApiError(message, 401, utils_1.ErrorCodes.AUTH_UNAUTHORIZED_ACCESS);
    }
    static forbidden(message) {
        return new ApiError(message, 403, utils_1.ErrorCodes.AUTH_UNAUTHORIZED_ACCESS);
    }
    static notFound(message) {
        return new ApiError(message, 404, utils_1.ErrorCodes.GENERAL_NOT_FOUND);
    }
    toApiResponse() {
        return {
            success: false,
            statusCode: this.statusCode,
            message: this.message,
            data: null,
            error: {
                code: this.errorCode,
                message: this.isOperational ? this.message : "Internal Server Error",
            },
            timestamp: new Date().toISOString(),
        };
    }
}
exports.ApiError = ApiError;
