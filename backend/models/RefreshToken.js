import mongoose from "mongoose";
import crypto from "crypto";

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: { type: String, required: true },
    is_Used: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }, // Creates createdAt and updatedAt fields automatically
);

// Deterministic SHA-256 hash hook
tokenSchema.pre("save", function () {
  if (!this.isModified("token")) return;

  this.token = crypto.createHash("sha256").update(this.token).digest("hex");
});

//that's why you use ai for code review
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const RefreshToken = mongoose.model("RefreshToken", tokenSchema);
export default RefreshToken;
