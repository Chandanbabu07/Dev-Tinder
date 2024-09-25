const asyncHandler = require("express-async-handler");
const connectionDB = require("../models/userConnectionModel");
const User = require("../models/userInfoModel");
const { ObjectId } = require("mongodb");
const { set } = require("mongoose");

const connectionRequest = asyncHandler(async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  try {
    if (fromUserId.equals(new ObjectId(toUserId))) {
      return res
        .status(400)
        .send({ message: "you cannot send request to userself" });
    }
    const acceptedStatusCodes = ["IGNORED", "INTERESTED"];

    if (!acceptedStatusCodes.includes(status)) {
      return res.status(400).send({ message: "Invalid Status Code" });
    }

    const checkUserExist = await User.findById(toUserId);

    if (!checkUserExist) {
      return res.status(400).send({ message: "User doesnot exist" });
    }

    const checkConnectExist = await connectionDB.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    console.log("checkConnectExist", checkConnectExist);

    if (checkConnectExist) {
      return res.status(400).send({ message: "connection already exist" });
    }

    const saveConnectionRequest = new connectionDB({
      fromUserId,
      toUserId,
      status,
    });
    saveConnectionRequest.save();

    res.status(200).send("connestion established successfully!!");
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const reviewConnection = asyncHandler(async (req, res) => {
  const logedInuser = req.user;
  const { status, requestId } = req.params;

  try {
    const allowedStatus = ["ACCEPTED", "REJECTED"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).send({ message: "Status Not Allowed" });
    }

    const findUserRequest = await connectionDB.findOne({
      $and: [
        { _id: requestId },
        { status: "INTERESTED" },
        { toUserId: logedInuser._id },
      ],
    });

    if (!findUserRequest) {
      return res.status(404).send({ message: "REQUEST not Found" });
    }

    findUserRequest.status = status;

    const data = await findUserRequest.save();

    res.status(200).json({ message: "Connection has been " + status, data });
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const fetchRequestedConnectionUsers = asyncHandler(async (req, res) => {
  const logedInuser = req.user;
  try {
    const getRequestedUsers = await connectionDB
      .find({
        $and: [{ toUserId: logedInuser._id }, { status: "INTERESTED" }],
      })
      .populate("fromUserId", "firstName lastName");

    res.status(200).json(getRequestedUsers);
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const fetchAcceptedConnectionUsers = asyncHandler(async (req, res) => {
  const logedInuser = req.user;

  try {
    const getRequestedUsers = await connectionDB
      .find({
        $and: [{ toUserId: logedInuser._id }, { status: "ACCEPTED" }],
      })
      .populate("fromUserId", "firstName lastName");

    res.status(200).json(getRequestedUsers);
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

const fetchFeed = asyncHandler(async (req, res) => {
  const logedInuser = req.user;
  const sort = parseInt(req.query.sort) || 1;
  const limit = parseInt(req.query.limit) || 10;

  console.log("sortVal", sort, limit);
  const sortLogic = (sort - 1) * limit;

  try {
    const userFeed = await connectionDB
      .find({
        $or: [{ fromUserId: logedInuser._id }, { toUserId: logedInuser._id }],
      })
      .select("fromUserId toUserId");

    const pickUserIds = new Set();

    userFeed.forEach((element) => {
      pickUserIds.add(element.fromUserId.toString());
      pickUserIds.add(element.toUserId.toString());
    });

    const feedUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(pickUserIds) } },
        { _id: { $ne: logedInuser._id } },
      ],
    })
      .select("firstName lastName emailId gender age about skills")
      .skip(sortLogic)
      .limit(limit);

    console.log(feedUsers);

    res.status(200).send(feedUsers);
  } catch (error) {
    throw new Error("SomeThing Went Wrong");
  }
});

module.exports = {
  connectionRequest,
  reviewConnection,
  fetchRequestedConnectionUsers,
  fetchAcceptedConnectionUsers,
  fetchFeed,
};
