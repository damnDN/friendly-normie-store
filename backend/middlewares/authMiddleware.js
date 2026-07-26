import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/appError.js";

//Check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // 1. Check if header exists and follows the 'Bearer <token>' pattern
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(
      "Access token missing or invalid format",
      401,
      "ACCESS_TOKEN_MISSING",
    );
  }

  // 2. Safely extract the token string
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token synchronously with your secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach payload to request for the next middleware/routes
    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      throw new AppError("User no longer exists", 401, "USER_NOT_FOUND");
    }

    req.user = user;
    next();
  } catch (error) {
    // 5. Catch token expiration specifically for your frontend retry loop
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        code: "TOKEN_EXPIRED",
        message: "Access token has expired",
      });
    }

    // 6. Forward any other token validation errors to your AppError handler
    throw new AppError(
      "Invalid or manipulated access token",
      401,
      "INVALID_ACCESS_TOKEN",
    );
  }
});

//RBAC. Check if user is admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authroized as an admin" });
  }
};

export { authenticate, authorizeAdmin };
