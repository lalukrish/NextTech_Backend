const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Optional: Adds createdAt and updatedAt timestamps
  }
);

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
