import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LogisticForm from "../components/LogisticForm";
import moment from "moment";


// const Logistic = require("MP3\models\logisticModel.js");
  


function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  // const [space, setSpace] = useState();
 
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [logistic, setLogistic] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const [source, setSource] = useState('');

  const handleChangeSource = (event) => {
    setSource(event.target.value);
  }

  const [destination, setDestination] = useState('');

  const handleChangeDestination = (event) => {
    setDestination(event.target.value);
  }

  const getLogisticData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/logistic/get-logistic-info-by-id",
        {
          logisticId: params.logisticId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setLogistic(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      // console.log(space);
      // /api/user/check-booking-avilability 404 (Not Found)
      const currentTime = moment().format('HH:mm');

      const currentDate = moment().format('YYYY-MM-DD');
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          logisticId: params.logisticId,
          date: currentDate,
          time: currentTime,
          value: value,
          // required_space: space,
          source: source,
          destination: destination
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    const currentTime = moment().format('HH:mm');

      const currentDate = moment().format('YYYY-MM-DD');
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          logisticId: params.logisticId,
          userId: user._id,
          logisticInfo: logistic,
          userInfo: user,
          date: currentDate,
          time: currentTime,
          required_space: value,
          source: source,
          destination: destination
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        

        toast.success(response.data.message);
        navigate('/appointments')
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getLogisticData();
  }, []);
  return (
    <Layout>
      {logistic && (
        <div>
          <h1 className="page-title">
            {logistic.firstName} {logistic.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">

            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height='400'
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {logistic.deparaturAndArrival_timings[0]} - {logistic.deparaturAndArrival_timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {logistic.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {logistic.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {logistic.feePerkm}
              </p>
              <p>
              <b>Availability : </b>
              {logistic.available_space}
            </p>
              <div className="d-flex flex-column pt-2 mt-2">
                {/* <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                  }}
                /> */}
                <label htmlFor="input-field">Required Space:</label>
                <input type="number" id="input-field" value={value} onChange={handleChange} />

                <label htmlFor="source">Source:</label>
                <input type="text" id="source" value={source} onChange={handleChangeSource} />

                <label htmlFor="destination">Destination:</label>
                <input type="text" id="destination" value={destination} onChange={handleChangeDestination} />


                {/* <Input
                  type="number"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    console.log (value)
                    setSpace(value);
                  }}
                  
                />
                <Input
                  type="text"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setSource(value);
                  }}
                  
                />
                <Input
                  type="text"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDestination(moment(value));
                  }}
                  
                /> */}
              {!isAvailable &&   <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
           
          </Row>
        </div>
      )}
    </Layout>
  );
}
export default BookAppointment;