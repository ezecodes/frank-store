import { ApiResponse } from "./interface";
import { ErrorCodes } from "./utils";

class SuccessHandler {
  public static ok<T>(
    data: T,
    message = "Operation successful"
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode: 200,
      message,
      data,
      error: null,
      timestamp: new Date().toISOString(),
    };
  }

  public static created<T>(
    data: T,
    message = "Resource created successfully"
  ): ApiResponse<T> {
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

class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorCode: ErrorCodes;

  constructor(
    message: string,
    statusCode: number,
    errorCode: ErrorCodes,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode ?? ErrorCodes.GENERAL_INTERNAL_ERROR;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }

  public static badRequest(message: string, errorCode: ErrorCodes): ApiError {
    return new ApiError(message, 400, errorCode);
  }

  public static unauthorized(message: string): ApiError {
    return new ApiError(message, 401, ErrorCodes.AUTH_UNAUTHORIZED_ACCESS);
  }

  public static forbidden(message: string): ApiError {
    return new ApiError(message, 403, ErrorCodes.AUTH_UNAUTHORIZED_ACCESS);
  }

  public static notFound(message: string): ApiError {
    return new ApiError(message, 404, ErrorCodes.GENERAL_NOT_FOUND);
  }
  public toApiResponse(): ApiResponse<null> {
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

export { ApiError, SuccessHandler };
