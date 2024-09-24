const express = require("express");
const {
  authSignup,
  authLogin,
  authLogout,
} = require("../controllers/authControllers");

const router = express.Router();

router.route("/signup").post(authSignup);
router.route("/login").post(authLogin);
router.route("/logout").post(authLogout);

module.exports = router;
