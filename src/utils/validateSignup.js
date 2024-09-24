const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !emailId || !password) {
    // res.status(400).send("Fields required");

    throw new Error("Please fill required fields");
  }

  if (!validator.isEmail(emailId)) {
    // res.status(400).send("Please Enter Valid emailid");

    throw new Error("Please Enter Valid emailid");
  }

  if (!validator.isStrongPassword(password)) {
    // res.status(400).send("entered password is week");

    throw new Error("entered password is week");
  }
};

const validateLogin = (req) => {
  const emailId = req.body.emailId;

  if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter Valid emailid");
  }
};

const validateProfileUpdate = (req) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    req.body;

};

module.exports = { validateSignup, validateLogin };
