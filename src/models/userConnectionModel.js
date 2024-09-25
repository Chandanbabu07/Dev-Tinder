const mongoose = require("mongoose");
const User = require("../models/userInfoModel");

const userConnectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["IGNORED", "INTERESTED", "ACCEPTED", "REJECTED"],
        message: `{VALUES} is not Accepted`,
      },
    },
  },
  { timestamps: true }
);

userConnectionSchema.pre("save", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("you cannot send request to userself");
  }
  next();
});
module.exports = mongoose.model("UserConnection", userConnectionSchema);
