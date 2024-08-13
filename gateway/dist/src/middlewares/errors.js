"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
exports.notFoundMiddleware = notFoundMiddleware;
exports.zodErrors = zodErrors;
exports.catchAsyncErrors = catchAsyncErrors;
const zod_1 = require("zod");
const failure_1 = require("../response-handlers/failure");
const utils_1 = require("../utils");
function zodErrors(error, req, res, next) {
    if (error instanceof zod_1.ZodError) {
        const [formattedError] = error.errors.map((issue) => ({
            message: issue.message,
            code: issue.code,
        }));
        const errorResponse = failure_1.ApiError.badRequest(formattedError.message, formattedError.code === "invalid_type"
            ? utils_1.ErrorCodes.VALIDATION_MISSING_FIELD
            : utils_1.ErrorCodes.VALIDATION_INVALID_FORMAT);
        return res
            .status(errorResponse.statusCode)
            .json(errorResponse.toApiResponse());
    }
    return next();
}
function catchAsyncErrors(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
function errorMiddleware(error, req, res, next) {
    if (error instanceof failure_1.ApiError) {
        const response = error.toApiResponse();
        res.status(response.statusCode).json(response);
    }
    else {
        // Handle unexpected errors
        const response = {
            success: false,
            statusCode: 500,
            message: "Internal Server Error",
            data: null,
            error: {
                code: utils_1.ErrorCodes.GENERAL_INTERNAL_ERROR,
                message: error.message || "An unexpected error occurred",
            },
            timestamp: new Date().toISOString(),
        };
        res.status(500).json(response);
    }
}
function notFoundMiddleware(req, res, next) {
    const error = failure_1.ApiError.notFound(`Resource not found - ${req.originalUrl}`);
    next(error);
}
