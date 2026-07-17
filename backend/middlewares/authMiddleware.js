import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/appError.js";

//Check if the user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (!token) {
    throw new AppError("Not authenticated: Token was not provided", 401);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId).select("-password");
    next();
  } catch (error) {
    throw new AppError(error.message, 401);
    //refresh tokens coming soon
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
