const asyncHandler = require("express-async-handler");
const { validateSignup, validateLogin } = require("../utils/validateSignup");
const bcrypt = require("bcrypt");
const User = require("../models/userInfoModel");

const authSignup = asyncHandler(async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  console.log("ReqestBody", req.body);

  try {
    validateSignup(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send("SignedUp Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
    console.error("Error :" + error.message);
  }
});

const authLogin = asyncHandler(async (req, res) => {
  const { emailId, password } = req.body;

  try {
    validateLogin(req);

    const user = await User.findOne({ emailId: emailId });
    console.log("checkEmailExistorNot", user);

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const comparePassword = await user.validatePassword(password);

    if (comparePassword) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(400).send("Login Successfull..!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
    console.error("Error :" + error.message);
  }
});

const authLogout = asyncHandler(async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .status(200)
    .send("Logged-out Successfull..!!!");
});

module.exports = { authSignup, authLogin, authLogout };
