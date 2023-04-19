import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import "./view.css"
function View() {
  const [patient, setPatient] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchPatientData = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/patients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        setPatient(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(showLoading());
    fetchPatientData(id);
  }, [dispatch, fetchPatientData, id]);

  return (
    <div className="container">
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Patient Details</h5>
      </div>
      <div className="card-body">
        <div className="patient-info">
          <label>ID:</label>
          <p>{patient.id}</p>
        </div>
        <div className="patient-info">
          <label>Name:</label>
          <p>{patient.name}</p>
        </div>
        <div className="patient-info">
          <label>Age:</label>
          <p>{patient.age}</p>
        </div>
        <div className="patient-info">
          <label>Phone:</label>
          <p>{patient.phone}</p>
        </div>
        <div className="patient-info">
          <label>Address:</label>
          <p>{patient.address}</p>
        </div>
        <div className="back-btn">
          <Link to="/search-patient">Back to Patients</Link>
        </div>
      </div>
    </div>
  </div>
  );  
}

export default View;
