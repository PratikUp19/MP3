const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Logistic = require("../models/logisticModel");

const authMiddleware = require("../middlewares/authMiddleware");
const mongoose = require('mongoose');

router.get("/get-all-logistics", authMiddleware, async (req, res) => {
  try {
    const logistics = await Logistic.find({});
    res.status(200).send({
      message: "Logistics fetched successfully",
      success: true,
      data: logistics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying logistic account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying logistic account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-logistic-account-status",
  authMiddleware,
  async (req, res) => {
    try {
      const { logisticId, status } = req.body;
      const logistic = await Logistic.findByIdAndUpdate(logisticId, {
        status,
      });

      const user = await User.findOne({ _id: logistic.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-logistic-request-changed",
        message: `Your logistic account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isLogistic = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Logistic status updated successfully",
        success: true,
        data: logistic,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying logistic account",
        success: false,
        error,
      });
    }
  }
);


module.exports = router;