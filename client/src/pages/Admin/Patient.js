import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Patient.css";
function Patient() {
  
const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // client-side validation
    if (!patientData.name || !patientData.age || !patientData.gender || !patientData.address || !patientData.phone) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await fetch("/api/admin/register-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsSubmitted(true);
      navigate.push('/');
      // TODO: handle successful submission
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

   
  if (isSubmitted) {
    return (
      <div>
        <p>Form successfully submitted!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <label>
        Name:
        <input type="text" name="name" value={patientData.name} onChange={handleInputChange} />
      </label>

      <label>
        Age:
        <input type="number" name="age" value={patientData.age} onChange={handleInputChange} />
      </label>

      <label>
        Gender:
        <select name="gender" value={patientData.gender} onChange={handleInputChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Address:
        <textarea name="address" value={patientData.address} onChange={handleInputChange}></textarea>
      </label>

      <label>
        Phone:
        <input type="text" name="phone" value={patientData.phone} onChange={handleInputChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Patient;

 