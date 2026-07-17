import User from "../models/User.js";

import asyncHandler from "../middlewares/asyncHandler.js";

import hash from "../utils/generateHash.js";
import createToken from "../utils/createToken.js";
import AppError from "../utils/appError.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    //see the log in notion: WHY YOU MUST USE CUSTOM ERROR(class)
    throw new AppError("FILL ALL THE DETAILS", 400);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("USER ALREADY EXISTS", 400);
  }

  //Hashing the password handled in model

  //Creating a new user
  const newUser = await new User({ username, email, password });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    //well, could use the custom error instance here but this also works. REMEMBER.
    res.status(400);
    throw new AppError("Invalid user data", 400);
  }
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
  createToken(res, userExists._id);
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
