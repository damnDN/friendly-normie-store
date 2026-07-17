const errorHandler = (error, req, res, next) => {
  //1. logging the error for internal tracking
  console.log(error);

  //2. getting the error code
  const errorCode = error.statusCode || error.status || 500;
  res.status(errorCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    //leaks stack traces during local development
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};
export { errorHandler };
