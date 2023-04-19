import React from "react";
import { useNavigate } from "react-router-dom";

function Logistic({ logistic }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${logistic._id}`)}
    >
      <img src="https://www.janderijk.com/wp-content/uploads/2019/02/DSC0704-e1550065588328.jpg"  className="card-image"/>

      <h1 className="card-title">
        {logistic.firstName} {logistic.lastName}
      </h1>
      <hr />
      <p>
        <b>Phone Number : </b>
        {logistic.phoneNumber}
      </p>
      
      <p>
        <b>Fee per Visit : </b>
        {logistic.feePerkm}
      </p>
      <p>
        <b>Timings : </b>
        {logistic.deparaturAndArrival_timings[0]} - {logistic.deparaturAndArrival_timings[1]}
      </p>
    </div>
  );
}

export default Logistic;