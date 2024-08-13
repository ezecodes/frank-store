"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    // Authentication Errors
    ErrorCodes["AUTH_INVALID_CREDENTIALS"] = "AUTH-001";
    ErrorCodes["AUTH_UNAUTHORIZED_ACCESS"] = "AUTH-002";
    // Validation Errors
    ErrorCodes["VALIDATION_MISSING_FIELD"] = "VALID-001";
    ErrorCodes["VALIDATION_INVALID_FORMAT"] = "VALID-002";
    // Database Errors
    ErrorCodes["DB_CONNECTION_FAILED"] = "DB-001";
    ErrorCodes["DB_QUERY_TIMEOUT"] = "DB-002";
    // General Errors
    ErrorCodes["GENERAL_INTERNAL_ERROR"] = "GEN-001";
    ErrorCodes["GENERAL_NOT_FOUND"] = "GEN-002";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
