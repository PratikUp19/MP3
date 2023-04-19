const mongoose = require("mongoose");
const logisticSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    source : {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    feePerkm: {
      type: Number,
      required: true,
    },
    deparaturAndArrival_timings : {
      type: Array,
      required: false,
    },
    available_space:{
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    }
  },
  {
    timestamps: true,
  }
);

const logisticModel = mongoose.model("logistics", logisticSchema);
module.exports = logisticModel;
