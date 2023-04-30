const express = require("express");
const router = express.Router();
const Logistic = require("../models/logisticModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const nodemailer=require('nodemailer')

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
    // console.log(req.body)
    try {
      const logistic = await Logistic.findOne({ userId: req.body.userId });
      // console.log(logistic.firstName)
      const appointments = await Appointment.find({ logisticId: logistic._id });
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
router.get(
  "/get-approvedappointments-by-logistic-id",
  authMiddleware,
  async (req, res) => {
    // console.log(req.body)
    try {
      const logistic = await Logistic.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ logisticId: logistic._id });
      // console.log(appointments)
      const value=[];     
      const statuses = appointments.map(async ( appointment) => {
        console.log(appointment._id)
        if(appointment.status!="rejected"&&appointment.status!="pending")
        {
          value.push(appointment)
        }
       
        if(appointment.status==="delivered"&&appointment.delivery===false)
        { 
          
         const a=await Appointment.findByIdAndUpdate(appointment._id, {
            delivery:true,
          }, { new: true });
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sharvariypatil@gmail.com',
              pass: 'uaqjawlmhiljnyup'
            }
          });
          const message = {
            from: 'sharvariypatil@gmail.com',
            to: appointment.userInfo.email,
            subject: 'Booking',
            text: `Dear ${appointment.userInfo.name},

            We are pleased to inform you that your package with tracking number [Tracking Number] has been successfully delivered to the address you provided.
            
            We hope that the package arrived in good condition and that you are satisfied with the service provided by our Logistics. If you have any feedback or concerns regarding your package delivery, please feel free to contact us at [Contact Information].
            Thank you for choosing XYZ Logistics for your package delivery needs. We look forward to serving you again in the future.
            Best regards,
            
            [Your Name]
            Customer Service Representative
            XYZ Logistics`
         
         
         
          };
          transporter.sendMail(message, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
        }
        
          
      });
     
      
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: value,
      
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
    // console.log(req.body.user);
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
   console.log("status ",status);
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