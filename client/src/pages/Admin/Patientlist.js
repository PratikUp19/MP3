import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import "./Patientlist.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const fetchPatientsData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setPatients(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPatientsData();
  }, [fetchPatientsData]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/patients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setPatients(patients.filter((patient) => patient._id !== id));
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
     <h1></h1>
      <div class="input-container">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          
        />
        <button>SEARCH</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients
            .filter((patient) =>
              patient.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            .map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>
                  <Link to={`/update/${patient._id}`}>
                    <button className="btn btn-edit">EDIT</button>
                  </Link>
                  <Link to={`/view/${patient._id}`}>
                    <button className="btn btn-view">VIEW</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(patient._id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default PatientList;
