const asyncHandler = require("express-async-handler");
const User = require("../models/userInfoModel");
const bcrypt = require("bcrypt");

const getProfileInfo = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      res.status(200).send(user);
    } else {
      throw new Error("Error :" + error.message);
    }
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const updateProfileInfo = asyncHandler(async (req, res) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    req.body;

  try {
    const user = req.user;

    const updateUser = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        photoUrl: photoUrl,
        about: about,
        skills: skills,
      },
      {
        new: true,
      }
    );

    res.status(200).send(updateUser);
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const { currentPassword, enterdPassword, reEnteredPassword } = req.body;

    const hashedCurrentPassword = user.password;

    const compareCurrentPassword = await bcrypt.compare(
      currentPassword,
      hashedCurrentPassword
    );

    if (!compareCurrentPassword) {
      return res.status(400).send({ error: "Current Password is not correct" });
    }

    if (enterdPassword !== reEnteredPassword) {
      return res
        .status(400)
        .send({
          error: "enterdPassword and reEnteredPassword is not matching",
        });
    }

    if (enterdPassword === reEnteredPassword) {
      const hashedUpdatedPassword = await bcrypt.hash(enterdPassword, 10);

      const updatePassword = await User.findByIdAndUpdate(
        { _id: user._id },
        { password: hashedUpdatedPassword },
        { new: true }
      );

      res.status(200).send("your Password has been updated successfull...!!");
    } else {
      return res
        .status(400)
        .send({
          error: "NOT UPDATED !!!",
        });
    }
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

module.exports = { getProfileInfo, updateProfileInfo, updateUserPassword };
