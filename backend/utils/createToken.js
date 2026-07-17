import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //Set JwT as an http-only cookie
  //Yes, res.cookie does not end the request, res.send and similar others do
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default createToken;

/*
* httpOnly: true
    prevents JS from reading the cookie
    without it: document.cookie could reveal the JWT(smart)
    protects against XSS attacks.

* secure: process.env.NODE_ENV !== "development"
    a boolean expression. result is false if nodeenv == development
    meaning: use https in production, devs used it while build.
    elaboration: app behaves differently in development vs production

* sameSite: "strict"
    default is 'none'
    a bit broad topic, see notion  
*/
