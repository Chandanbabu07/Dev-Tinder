const jwt = require("jsonwebtoken");
const User = require("../models/userInfoModel");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).send({ error: "Invalid Token" });
  }

  const verifiedToken = await jwt.verify(token, "$DevTinder@Chandan");
  console.log("verifiedToken", verifiedToken);

  const user = await User.findById({ _id: verifiedToken._id });
  if (!user) {
    throw new Error("User Not Found");
  }

  req.user = user;

  next();
};

module.exports = { userAuth };
