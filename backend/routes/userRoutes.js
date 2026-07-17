import express from "express";

//middlewares
import { errorHandler } from "../middlewares/errorHandler.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

//controllers
import {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userConroller.js";

const router = express.Router();

router
  .route("/")
  .post(createUser, errorHandler)
  .get(authenticate, authorizeAdmin, getAllUsers, errorHandler);
router.post("/login", loginUser, errorHandler);
router.get("/logout", logOutUser, errorHandler); //simulating logging out(a button/link is used irl)
router
  .route("/profile")
  .get(authenticate, getUser, errorHandler)
  .put(authenticate, updateUser, errorHandler);

export default router;
