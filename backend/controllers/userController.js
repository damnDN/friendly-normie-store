//ONE THING IS BUGGING ME: Completely removed try-catch utilisation because of async wrapper(asyncHandler.js). Is this seriously fine?

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import crypto from "crypto";
import hash from "../utils/generateHash.js";
import createJWT from "../utils/createJWT.js";
import createRefToken from "../utils/createRefreshToken.js";
import AppError from "../utils/appError.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    //see the log in notion: WHY YOU MUST USE CUSTOM ERROR(class)
    throw new AppError("Fill all details", 400, "MISSING_REQUIRED_FIELDS");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("USER ALREADY EXISTS", 400, "USER_ALREADY_EXISTS");
  }

  //Hashing the password: handled in model

  //Creating a new user
  const newUser = new User({ username, email, password });
  await newUser.save();
  const accToken = createJWT(newUser._id);
  const refToken = createRefToken(res);

  const newRefToken = new RefreshToken({
    userId: newUser._id,
    token: refToken,
  });
  await newRefToken.save();

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    accessToken: accToken, // Send initial AT to React frontend
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { field, password } = req.body;
  if (!field || !password) {
    throw new AppError("Fill all details", 400, "MISSING_REQUIRED_FIELDS");
  }

  //no user can have any non-alphanumeric character in username so following is immaculate
  const key = field.includes("@") ? "email" : "username";

  const userExists = await User.findOne({ [key]: field });
  if (!userExists) {
    throw new AppError(
      "User does not exist, please sign up.",
      404,
      "USER_NOT_FOUND",
      {
        field: "User does not exist",
      },
    );
  }
  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid Password", 401, "INVALID_CREDENTIALS", {
      password: "Invalid password.",
    });
  }
  const accToken = createJWT(userExists._id);
  const refToken = createRefToken(res);
  const newRefToken = new RefreshToken({
    userId: userExists._id,
    token: refToken,
  });
  await newRefToken.save();

  res.status(200).json({
    _id: userExists._id,
    username: userExists.username,
    email: userExists.email,
    isAdmin: userExists.isAdmin,
    accessToken: accToken,
    message: `Welcome Back ${userExists.username}`,
  });
});

const logOutUser = asyncHandler(async (req, res) => {
  const incomingRefToken = req.cookies?.refreshToken;
  if (!incomingRefToken) {
    throw new AppError("Refresh token missing", 401, "REFRESH_TOKEN_MISSING");
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(incomingRefToken)
    .digest("hex");
  const token = await RefreshToken.findOneAndUpdate(
    {
      userId: req.user._id,
      token: hashedToken,
      is_Used: false,
    },
    { $set: { is_Used: true } },
  );
  if (!token) {
    throw new AppError(
      "Invalid or already used refresh token",
      401,
      "INVALID_REFRESH_TOKEN",
    );
  }
  res.clearCookie("refreshToken", {
    //aow, i sense need of design pattern
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  //FYI: new Date(0) is c/d epoch date.
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ users: allUsers });
});

const getUser = asyncHandler(async (req, res) => {
  const { username, email } = req.user;
  res.status(200).json({
    greet: `Welcome ${username}, your email is ${email}`,
    other: "To be created later",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) throw new AppError("User not found", 400, "USER_NOT_FOUND");
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
  });
});

export { createUser, loginUser, logOutUser, getAllUsers, getUser, updateUser };

/**
* Throwing error in catch literally overrides all the error handling done in asyncHandler().
* Explanation: With throw AppError in catch block you are manually catching the original
* error, breaking the promise chain initialized by asyncHandler(). Throwing a new error
* inside a catch block without returning/re-throwing it correctly causes an unhandled rejection.

* Solution:
* A) Use next param and instead of throwing Error(....) do next(new Error()) in the catch block,
* it will keep the asyncHandler's promise chain intact.
* B) Don't use try-catch(Since asyncHandler's already for catching errors), write a great global level
*    error middleware. 

* I used B.
**/
