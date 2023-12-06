const mongoose = require("mongoose");

const userStatusSchema = new mongoose.Schema({
  notifications: [
    {
      message: {
        type: String,
        required: true,
      },
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      status: {
        type: String,
        default: "unread", // You can use "unread" or "read" to track the status.
      },
    },
  ],
});

const UserStatus = mongoose.model("UserStatus", userStatusSchema);

module.exports = UserStatus;
