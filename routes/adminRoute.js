const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Logistic = require("../models/logisticModel");
const Patient = require('../models/PatientModel');
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

router.post('/register-patient', authMiddleware, async (req, res) => {
  try {
    const { name, age, gender, address, phone } = req.body;

    const patient = new Patient({
      name,
      age,
      gender,
      address,
      phone,
    });

    const result = await patient.save();

    res.status(201).json({
      message: 'Patient created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating patient',
      success: false,
      error,
    });
  }
});
 


/* pateints */
router.get("/patients", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).send({
      message: "Patients fetched successfully",
      success: true,
      data: patients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching patients",
      success: false,
      error,
    });
  }
});
// Route definition
router.delete('/api/patients/:id', (req, res) => {
  const id = req.params.id;

  // Handle the request
  db.deletePatient(id)
    .then(() => {
      // Respond with a success message
      res.status(200).json({ success: true, message: 'Patient deleted successfully.' });
    })
    .catch((error) => {
      // Respond with an error message
      res.status(500).json({ success: false, error: error.message });
    });
});
router.get('/view/patient/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/patients/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id); // use the findById method to find the patient with the given id
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    return res.json({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      phone: patient.phone,
      address: patient.address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update patient by ID
router.put('/patients/:id', async (req, res) => {
  const id = req.params.id;
  const { name, age, phone, address } = req.body;
  
  try {
    // Find the patient with the given ID
    const patient = await Patient.findById(id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Update the patient's information
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.phone = phone || patient.phone;
    patient.address = address || patient.address;
    
    // Save the updated patient to the database
    const updatedPatient = await patient.save();
    
    res.json(updatedPatient);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});
 
router.delete('/patients/:id', authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    await patient.remove();
    return res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;