const errorHandler = (error, req, res, next) => {
  console.error("🎵 ERROR INTERCEPTED:", error);

  // Avoid mutating the original
  let formattedError = { ...error };
  formattedError.message = error.message;

  // Now, this ifs(error extracts) need to be remembered
  // MUC(Mongoose Unique Constraint) violation (eg, email already registered)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    formattedError.message = `${field.toUpperCase()} ALREADY EXISTS`;
    formattedError.statusCode = 400;
  }

  // Mongoose Validation Failures (e.g., password too short)
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((val) => val.message);
    formattedError.message = messages.join(", ");
    formattedError.statusCode = 400;
  }

  // Handle Invalid MongoDB ObjectIDs (Cast Errors)
  if (error.name === "CastError") {
    formattedError.message = `Invalid ID format for path: ${error.path}`;
    formattedError.statusCode = 400;
  }

  // Extract the final status code or default to 500
  const errorCode = formattedError.statusCode || 500;

  res.status(errorCode).json({
    success: false,
    message: formattedError.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

//INCOMPLETE
export { errorHandler };
