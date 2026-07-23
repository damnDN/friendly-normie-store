import RefreshToken from "../models/RefreshToken.js";
import asyncHandler from "./asyncHandler.js";
import createJWT from "../utils/createJWT.js";
import createRefToken from "../utils/createRefreshToken.js";
import crypto from "crypto";
import AppError from "../utils/appError.js";

const refresh = asyncHandler(async (req, res) => {
  const incomingRT = req.cookies.refreshToken;
  if (!incomingRT) throw new AppError("Refresh token missing", 401);

  // Hash the incoming plain-text cookie token to match the database value
  const hashedIncomingToken = crypto
    .createHash("sha256")
    .update(incomingRT)
    .digest("hex");

  // Find the token record
  //EDIT: what about the race condition??
  const savedTokenDocument = await RefreshToken.findOne({
    token: hashedIncomingToken,
  });
  if (!savedTokenDocument) throw new AppError("Invalid refresh token", 403);

  // TOKEN REUSE DETECTION: If token was already used, someone might be attacking!
  if (savedTokenDocument.is_Used) {
    // Breach Protocol: Revoke ALL tokens belonging to this user for safety
    await RefreshToken.deleteMany({ userId: savedTokenDocument.userId });
    res.clearCookie("refreshToken");
    throw new AppError("Compromised session. Please re-authenticate.", 403);
  }

  // Mark the current token as used
  savedTokenDocument.is_Used = true;
  await savedTokenDocument.save();

  // Generate brand new pairs
  const newAT = createJWT(savedTokenDocument.userId);
  const newRawRT = createRefToken(res); // Sets the secure cookie automatically

  // Save the new token in the database
  const rotatedTokenRecord = new RefreshToken({
    userId: savedTokenDocument.userId,
    token: newRawRT,
    is_Used: false,
  });
  await rotatedTokenRecord.save();

  // Return new access token to React
  res.json({ accessToken: newAT });
});

export default refresh;
