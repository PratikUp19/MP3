// import { Button, Col, Form, Input, Row, TimePicker } from "antd";
// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import { useDispatch, useSelector } from "react-redux";
// import { showLoading, hideLoading } from "../../redux/alertsSlice";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import LogisticForm from "../../components/LogisticForm";
// import moment from "moment";

// function Profile() {
//   const { user } = useSelector((state) => state.user);
//   const params = useParams();
//   const [logistic, setLogistic] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const onFinish = async (values) => {
//     try {
//       dispatch(showLoading());
//       const response = await axios.post(
//         "/api/logistic/update-logistic-profile",
//         {
//           ...values,
//           userId: user._id,
//           timings: [
//             moment(values.deparaturAndArrival_timings[0]).format("HH:mm"),
//             moment(values.deparaturAndArrival_timings[1]).format("HH:mm"),
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       if (response.data.success) {
//         toast.success(response.data.message);
//         navigate("/");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       toast.error("Something went wrong");
//     }
//   };

//   const getLogisticData = async () => {
//     try {
//       dispatch(showLoading());
//       const response = await axios.post(
//         "/api/logistic/get-logistic-info-by-user-id",
//         {
//           userId: params.userId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       dispatch(hideLoading());
//       if (response.data.success) {
//         setLogistic(response.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(hideLoading());
//     }
//   };

//   useEffect(() => {
//     getLogisticData();
//   }, []);
//   return (
//     <Layout>
//       <h1 className="page-title">Logistic Profile</h1>
//       <hr />
//       {logistic && <LogisticForm onFinish={onFinish} initivalValues={logistic} />}
//     </Layout>
//   );
// }

// export default Profile;



import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LogisticForm from "../../components/LogisticForm";
import moment from "moment";
import "./Profile.css";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [logistic, setLogistic] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/logistic/update-logistic-profile",
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
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getLogisticData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/logistic/get-logistic-info-by-user-id",
        {
          userId: params.userId,
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

  useEffect(() => {
    getLogisticData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title" style={{ textAlign: 'center' }}>Logistic Profile</h1>
      <hr />
      <div className="centered-form">
      {logistic && <LogisticForm onFinish={onFinish} initivalValues={logistic} />}</div>
    </Layout>
  );
}

export default Profile;