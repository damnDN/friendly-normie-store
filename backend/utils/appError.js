class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
  }
}
export default AppError;
// There's:
// Error.captureStackTrace(this, this.constructor); too
// it's not a necesssity but for convenience and better error handling
// devs use it, i don't see myself using it even later for this project.
