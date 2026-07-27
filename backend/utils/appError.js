class AppError extends Error {
  constructor(message, statusCode, code = null, errors = null) {
    super(message);

    //LLM said it's for debugging, valid.
    this.name = "AppError";

    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
export default AppError;
// There's:
// Error.captureStackTrace(this, this.constructor);
// it's not a necesssity but for convenience and better error handling
// devs use it, i don't see myself using it even later for this project.
