const express = require("express");
const router = express.Router();
const Logistic = require("../models/logisticModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-logistic-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const logistic = await Logistic.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Logistic info fetched successfully",
      data: logistic,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting logistic info", success: false, error });
  }
});

router.post("/get-logistic-info-by-id", authMiddleware, async (req, res) => {
  try {
    const logistic = await Logistic.findOne({ _id: req.body.logisticId });
    res.status(200).send({
      success: true,
      message: "Logistic info fetched successfully",
      data: logistic,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting logistic info", success: false, error });
  }
});

router.post("/update-logistic-profile", authMiddleware, async (req, res) => {
  try {
    const logistic = await Logistic.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Logistic profile updated successfully",
      data: logistic,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting logistic info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-logistic-id",
  authMiddleware,
  async (req, res) => {
    try {
      const logistic = await Logistic.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ logisticId: logistic._id });
      console.log(appointments);
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your booking status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Booking status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing Booking status",
      success: false,
      error,
    });
  }
});

module.exports = router;