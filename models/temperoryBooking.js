const mongoose = require("mongoose");
const temperory = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    logisticId: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    required_space: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const temperoryBooking = mongoose.model("temperory", temperory);
module.exports = temperoryBooking;
