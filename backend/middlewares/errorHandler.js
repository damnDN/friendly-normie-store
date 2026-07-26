const errorHandler = (error, req, res, next) => {
  // Create a mutable copy, always the rule to strike through first
  const formattedError = {
    message: error.message,
    statusCode: error.statusCode,
    code: error.code,
  };
  if ((formattedError.statusCode || 500) >= 500) {
    console.error("🎵 ERROR INTERCEPTED:", error);
  } else {
    console.warn(`🎵 [${formattedError.statusCode}] ${formattedError.message}`);
  }

  // Mongo duplicate key (e.g. email already exists)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];

    formattedError.message = `${field.toUpperCase()} ALREADY EXISTS`;
    formattedError.statusCode = 400;
    formattedError.code = "DUPLICATE_RESOURCE";
  }

  // Mongoose validation errors
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((err) => err.message);

    formattedError.message = messages.join(", ");
    formattedError.statusCode = 400;
    formattedError.code = "VALIDATION_ERROR";
  }

  // Invalid ObjectId
  if (error.name === "CastError") {
    formattedError.message = `Invalid ID format for path: ${error.path}`;
    formattedError.statusCode = 400;
    formattedError.code = "INVALID_ID";
  }

  const statusCode = formattedError.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    code:
      formattedError.code ||
      (statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : undefined),
    message: formattedError.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

export { errorHandler };
