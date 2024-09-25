const express = require("express");
const {
  connectionRequest,
  fetchRequestedConnectionUsers,
  reviewConnection,
  fetchAcceptedConnectionUsers,
  fetchFeed,
} = require("../controllers/connectionController");
const { userAuth } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.route("/request/:status/:toUserId").post(userAuth, connectionRequest);
router.route("/review/:status/:requestId").post(userAuth, reviewConnection);
router
  .route("/request/fecthRequestedConnectionUsers")
  .get(userAuth, fetchRequestedConnectionUsers);
router
  .route("/accepted/connectionUsers")
  .get(userAuth, fetchAcceptedConnectionUsers);

router.route("/feed").get(userAuth, fetchFeed);

module.exports = router;
