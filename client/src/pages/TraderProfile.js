import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../TraderProfile.css'; 


function TraderProfile() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [trader, setTrader] = useState(null);
    const dispatch = useDispatch();
    if(user!=null)
    {
        console.log(user._id);
    }
//   console.log(user._id);
    const getTraderData = async () => {
      
        try {
            dispatch(showLoading());
            const response = await axios.get(
              `http://localhost:5000/api/user/get-profile/${params.userId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                  userId: params.userId,
                },
              }
            );
            console.log(response.data.data)
            dispatch(hideLoading());
            if (response.data.success) {
              setTrader(response.data.data);
            }
          } catch (error) {
            console.log(error);
            dispatch(hideLoading());
          }
        };
      
        useEffect(() => {
          getTraderData();
        }, [params.userId]);
  return  (
    <Layout>

    <div>
    <h1>Profile</h1>
    <div className="card">
      <p  className="title">Name:{trader.name}</p>
      
      <p className="title">Email:{trader.email}</p>
       </div>
  </div>
</Layout>
  )
}

export default TraderProfile;