import { ApiError } from "../utils/apiError.js";


const errorHandler = (err, req, res, next) => {
  // If the error is an instance of ApiError, handle it accordingly
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }

  // For all other errors, return a generic response
  const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
  });
};

export { errorHandler };
