import AppError from "../utils/appError.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errorMessages[field] = issue.message;
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errorMessages,
    });
  }

  req.body = result.data;
  next();
};

export default validate;
