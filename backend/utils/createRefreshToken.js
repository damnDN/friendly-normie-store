import crypto from "crypto";

const createRefToken = (res) => {
  const refToken = crypto.randomBytes(64).toString("hex");
  res.cookie("refreshToken", refToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return refToken;
};
export default createRefToken;

// import jwt from 'jsonwebtoken';
// export const generateAT = (userId) => {
//   return jwt.sign({ id: userId }, process.env.AT_SECRET, { expiresIn: '15m' });
// };

// export const setRTCookie = (res, refreshToken) => {
//   res.cookie('refreshToken', refreshToken, {
//     httpOnly: true,
//     secure: true, // Set to true in production (HTTPS)
//     sameSite: 'strict',
//     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
//   });
// };
