const express = require("express");
const { userAuth } = require("../middlewares/authMiddlewares");
const {
  getProfileInfo,
  updateProfileInfo,
  updateUserPassword,
} = require("../controllers/profileControllers");

const router = express.Router();

router.route("/profileInfo").get(userAuth, getProfileInfo);
router.route("/profileUpdate").patch(userAuth, updateProfileInfo);
router.route("/passwordUpdate").patch(userAuth, updateUserPassword);

module.exports = router;
