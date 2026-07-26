import express from "express";

//middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import refresh from "../middlewares/refresh.js";

//controllers
import {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

//validator + schemas
import validate from "../validation/validator.js";
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../validation/userSchema.js";

const router = express.Router();

router
  .route("/")
  .post(validate(createUserSchema), createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/login", validate(loginUserSchema), loginUser);

router.get("/logout", authenticate, logOutUser); //simulating logging out(a button/link is used irl)

router
  .route("/profile")
  .get(authenticate, getUser)
  .put(authenticate, validate(updateUserSchema), updateUser);

router.post("/refresh", refresh);

export default router;
