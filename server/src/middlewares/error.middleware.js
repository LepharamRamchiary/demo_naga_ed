import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const messages = error.errors?.map((e) => e.message) || [
        "Duplicate field value",
      ];
      error = new ApiError(409, "Duplicate field value", messages);
    } else if (error.name === "SequelizeValidationError") {
      const messages = error.errors?.map((e) => e.message) || [
        "Validation error",
      ];
      error = new ApiError(400, "Validation failed", messages);
    } else {
      const statusCode = error.statusCode || 500;
      error = new ApiError(
        statusCode,
        error.message || "Internal Server Error",
        [],
        err.stack,
      );
    }
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
