const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Replace 'User' with the actual name of your user model
  },
  coins: [
    {
      symbol: String,
      name: String,
      description: String,
      value: Number,
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
