"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessHandler = void 0;
class SuccessHandler {
    static ok(data, message = "Operation successful") {
        return {
            success: true,
            statusCode: 200,
            message,
            data,
            error: null,
            timestamp: new Date().toISOString(),
        };
    }
    static created(data, message = "Resource created successfully") {
        return {
            success: true,
            statusCode: 201,
            message,
            data,
            error: null,
            timestamp: new Date().toISOString(),
        };
    }
}
exports.SuccessHandler = SuccessHandler;
