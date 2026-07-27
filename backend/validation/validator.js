import AppError from "../utils/appError.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errorMessages[field] = issue.message;
    });

    //very very important fix. took me time to get this: till now I had two api contracts(this bypassed that global error handler)
    return next(
      new AppError("Validation failed", 400, "VALIDATION_ERROR", errorMessages),
    );

    //i could do this too?:
    // throw new AppError(
    //   "Validation failed",
    //   400,
    //   "VALIDATION_ERROR",
    //   errorMessages,
    // );
  }

  req.body = result.data;
  next();
};

export default validate;
