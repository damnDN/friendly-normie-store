//I hated using AI for this one at first but it was needed.
// It's so generic, auth systems are yeah but it's still not as expected. Nomenclature's great btw.

import RefreshToken from "../models/RefreshToken.js";
import asyncHandler from "./asyncHandler.js";
import createJWT from "../utils/createJWT.js";
import createRefToken from "../utils/createRefreshToken.js";
import crypto from "crypto";
import AppError from "../utils/appError.js";

const refresh = asyncHandler(async (req, res) => {
  const incomingRT = req.cookies.refreshToken;
  if (!incomingRT) throw new AppError("Refresh token missing", 401);
  //+ redirect user to login OH i could end the function here with .json{message: "Redirect user to login"}

  //hash the incoming token to verify with token in db
  const hashedIncomingToken = crypto
    .createHash("sha256")
    .update(incomingRT)
    .digest("hex");

  // find the token record from
  //EDIT: what about the race condition??
  const savedTokenDocument = await RefreshToken.findOne({
    token: hashedIncomingToken,
  });
  if (!savedTokenDocument) throw new AppError("Invalid refresh token", 403);

  // TOKEN REUSE DETECTION: not utterly futile, a big catch though: can cause DB bloat, will cure later.
  if (savedTokenDocument.is_Used) {
    //standard breach protocol: Revoke ALL tokens belonging to this userId for safety
    await RefreshToken.deleteMany({ userId: savedTokenDocument.userId });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
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
  });
  await rotatedTokenRecord.save();

  // Return new access token to React
  res.json({ accessToken: newAT });
});

export default refresh;
