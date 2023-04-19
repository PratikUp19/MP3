import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams(); // retrieve id from URL params
  const [formData, setFormData] = useState({}); // store form data
  const history = useNavigate(); // use history object to navigate

  // fetch patient data by id from backend API
  useEffect(() => {
    const fetchPatientData = async () => {
      const response = await fetch(`http://localhost:5000/api/admin/patients/${id}`);
      const data = await response.json();
      setFormData(data);
    };
    fetchPatientData();
  }, [id]);

  // handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:5000/api/admin/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    history("/search-patient"); // navigate to patients page
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Update Patient</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
