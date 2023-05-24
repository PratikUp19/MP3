import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";


function Dashboard() {


  return (
    <div className="authentication">
          <h1>Sagar rahangdale</h1>
          <Link to="/register" className="anchor mt-2">
            CLICK HERE TO REGISTER
          </Link>
          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO Login
          </Link>
    </div>
  );
}

export default Dashboard;
 