import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "./response-handler";
import { ErrorCodes } from "./utils";

function zodErrors(
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    const [formattedError] = error.errors.map((issue) => ({
      message: issue.message,
      code: issue.code,
    }));
    const errorResponse = ApiError.badRequest(
      formattedError.message,
      formattedError.code === "invalid_type"
        ? ErrorCodes.VALIDATION_MISSING_FIELD
        : ErrorCodes.VALIDATION_INVALID_FORMAT
    );
    return res
      .status(errorResponse.statusCode)
      .json(errorResponse.toApiResponse());
  }
  return next();
}

function catchAsyncErrors(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorMiddleware(
  error: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ApiError) {
    const response = error.toApiResponse();
    res.status(response.status_code).json(response);
  } else {
    // Handle unexpected errors
    const response = {
      success: false,
      status_code: 500,
      message: "Internal Server Error",
      data: null,
      error: {
        code: ErrorCodes.GENERAL_INTERNAL_ERROR,
        message: error.message || "An unexpected error occurred",
      },
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
  }
}

function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = ApiError.notFound(`Resource not found - ${req.originalUrl}`);
  next(error);
}

function corsConfig() {
  return cors({
    origin: [],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  });
}
function csp() {
  return helmet({
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
function httpLogger(req: Request, res: Response, next: NextFunction) {
  const statusColor = res.statusCode >= 400 ? chalk.red : chalk.green;

  const startHrTime = process.hrtime();
  const ipAddr =
    req.headers["x-forwarded-for"] || req.connection?.remoteAddress;

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log(
      `${ipAddr} - ${chalk.blue(req.method)} ${chalk.cyan(
        req.url
      )} [${statusColor(res.statusCode)}] - ${chalk.yellow(
        elapsedTimeInMs.toFixed(3)
      )} ms`
    );
  });
  next();
}
export {
  csp,
  corsConfig,
  httpLogger,
  errorMiddleware,
  notFoundMiddleware,
  zodErrors,
  catchAsyncErrors,
};
