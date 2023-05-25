import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogisticForm from "../components/LogisticForm";
import moment from "moment";
import "../ApplyLogistics.css";

function ApplyLogistic() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      console.log();
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-logistic-account",
        {
          ...values,
          
          userId: user._id,
          
          deparaturAndArrival_timings: [
            moment(values.deparaturAndArrival_timings[0]).format("HH:mm"),
            moment(values.deparaturAndArrival_timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.log("hello");
      console.log(error)
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      
      <div className="form-container">
        <div className="logistic-form">
          <h1 className="page-title" style={{ textAlign: 'center' }}>Apply Logistic</h1>
          <hr />
          <div className="centered-form">
      <LogisticForm onFinish={onFinish} />
    </div>
        </div>
      </div>
    </Layout>
  );
}

export default ApplyLogistic;
