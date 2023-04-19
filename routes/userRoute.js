const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Logistic = require("../models/logisticModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
const nodemailer=require('nodemailer')

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    const user=await newuser.save();
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sharvariypatil@gmail.com',
      pass: 'uaqjawlmhiljnyup'
    }
  });

  const message = {
    from: 'sharvariypatil@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Hi ${email}, please verify your email address by clicking on this link: http://localhost:3000/verify/${user._id}`
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    res
      .status(200)
      .send({ message: "Verify Your mail", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  
  try {
    // Find the user with the matching verification token
    const user = await User.findOne({ _id: token });
   
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token.' });
    }

    // Update the user's verification status
    user.is_verified = true;
    // user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email address verified successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to verify email address.' });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/apply-logistic-account", authMiddleware, async (req, res) => {
  try {
    const newlogistic = new Logistic({ ...req.body, status: "pending" });
    await newlogistic.save();
    const adminUser = await User.findOne({ isAdmin: true });
    console.log(adminUser);
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-logistic-request",
      message: `${newlogistic.firstName} ${newlogistic.lastName} has applied for a logistic account`,
      data: {
        logisticId: newlogistic._id,
        name: newlogistic.firstName + " " + newlogistic.lastName,
      },
      onClickPath: "/admin/logisticslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Logistic account applied successfully",
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
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
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

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
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

router.get("/get-all-approved-logistics", authMiddleware, async (req, res) => {
  try {
    const logistics = await Logistic.find({ status: "approved" });
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

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to logistic based on his userid
    const user = await User.findOne({ _id: req.body.logisticInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new Booking request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/logistic/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Container booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in booking container",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const logisticId = req.body.logisticId;
    const appointments = await Appointment.find({
      logisticId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Containers not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Containers available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in booking container",
      success: false,
      error,
    });
  }
});

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Containers fetched successfully",
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
});

module.exports = router;