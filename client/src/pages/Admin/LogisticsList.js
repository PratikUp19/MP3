import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function LogisticsList() {
  const [logistics, setLogistics] = useState([]);
  const dispatch = useDispatch();
  const getLogisticsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-logistics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setLogistics(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  
  const changeLogisticStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/admin/change-logistic-account-status",
        { logisticId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getLogisticsData();
      }
    } catch (error) {
      toast.error('Error changing logistic account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getLogisticsData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
//     {
//   title: "Created At",
//   dataIndex: "createdAt",
//   render: (record , text) => {
//     if (record && record.createdAt) {
//       return moment(record.createdAt).format("DD-MM-YYYY");
//     } else {
//       return "";
//     }
//   },
// },


    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1 style={{ marginRight: '10px' }}
              className="anchor"
              onClick={() => changeLogisticStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "pending" && (
            <h1 style={{ marginRight: '10px' }}
              className="anchor">
              Reject
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changeLogisticStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Logistics List</h1>
      <hr />
      <Table columns={columns} dataSource={logistics} />
    </Layout>
  );
}

export default LogisticsList;
