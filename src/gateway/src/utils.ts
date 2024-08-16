export enum ErrorCodes {
  // Authentication Errors
  AUTH_INVALID_CREDENTIALS = "AUTH-001",
  AUTH_UNAUTHORIZED_ACCESS = "AUTH-002",

  // Validation Errors
  VALIDATION_MISSING_FIELD = "VALID-001",
  VALIDATION_INVALID_FORMAT = "VALID-002",

  // Database Errors
  DB_CONNECTION_FAILED = "DB-001",
  DB_QUERY_TIMEOUT = "DB-002",

  // General Errors
  GENERAL_INTERNAL_ERROR = "GEN-001",
  GENERAL_NOT_FOUND = "GEN-002",
}
export enum QueueExchanges {
  DIRECT = "exch_direct",
}
export enum QueueNames {
  NEW_ORDER = "NEW_ORDER",
}
