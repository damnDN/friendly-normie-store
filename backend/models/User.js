import mongoose from "mongoose";
import hash from "../utils/generateHash.js";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await hash(this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
