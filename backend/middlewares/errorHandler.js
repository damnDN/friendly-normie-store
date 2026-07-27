const errorHandler = (error, req, res, next) => {
  // Create a mutable copy, always the rule to strike through first
  const formattedError = {
    message: error.message,
    statusCode: error.statusCode,
    code: error.code,
    errors: error.errors,
  };
  if ((formattedError.statusCode || 500) >= 500) {
    console.error("🎵 ERROR INTERCEPTED:", error);
  } else {
    console.warn(`🎵 [${formattedError.statusCode}] ${formattedError.message}`);
  }

  // Mongo duplicate key (e.g. email already exists)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];

    formattedError.message = "Validation failed";
    formattedError.statusCode = 400;
    formattedError.code = "DUPLICATE_RESOURCE";
    formattedError.errors = {
      [field]: `${field} already exists.`,
    };
  }

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    formattedError.message = "Validation failed";
    formattedError.statusCode = 400;
    formattedError.code = "VALIDATION_ERROR";
    formattedError.errors = {};

    for (const [field, err] of Object.entries(error.errors)) {
      formattedError.errors[field] = err.message;
    }
  }

  // Invalid ObjectId
  if (error.name === "CastError") {
    formattedError.message = `Invalid ID format for path: ${error.path}`;
    formattedError.statusCode = 400;
    formattedError.code = "INVALID_ID";
  }

  const statusCode = formattedError.statusCode || 500;

  const response = {
    success: false,
    code:
      formattedError.code ||
      (statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : undefined),
    message: formattedError.message || "Internal Server Error",
  };

  if (formattedError.errors) {
    response.errors = formattedError.errors;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

export { errorHandler };
