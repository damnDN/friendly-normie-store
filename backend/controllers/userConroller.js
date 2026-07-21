import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

import asyncHandler from "../middlewares/asyncHandler.js";

import hash from "../utils/generateHash.js";
import createJWT from "../utils/createJWT.js";
import createRefToken from "../utils/createRefreshToken.js";
import AppError from "../utils/appError.js";

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    //see the log in notion: WHY YOU MUST USE CUSTOM ERROR(class)
    throw new AppError("FILL ALL THE DETAILS", 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("USER ALREADY EXISTS", 400);
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
    is_Used: false,
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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Fill all details", 401);
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(200).send("EMAIL DOES NOT EXIST, please SIGN UP");
  }
  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid Password", 401);
  }
  createJWT(res, userExists._id);
  res.status(200).json({ message: `Welcome Back owner of email: ${email}` });
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
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
    message: `Welcome ${username}, your email is ${email}`,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new AppError("User not found", 401);
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.pasword;
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
