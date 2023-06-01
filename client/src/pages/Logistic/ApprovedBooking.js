import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { Dropdown, Menu } from 'antd';

function ApprovedBookings() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        "/api/logistic/get-approvedappointments-by-logistic-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("HEllo");
      console.log(resposne.data);
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/logistic/change-appointment-status",
        { appointmentId : record, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing logistic account status");
      dispatch(hideLoading());
    }
  };
  const columns = [
    {
      title: "Id",
       dataIndex: "_id",
      //render:(text,record)=><span>{record.userInfo._id}</span>
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.logisticInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status !== "rejected"&& record.status!=="pending" && (
            <div className="d-flex">
            
            <Dropdown.Button
            overlay={
              <Menu onClick={({key}) => changeAppointmentStatus(record, key)}>
              
               
                <Menu.Item key="approved">Approved</Menu.Item>
                <Menu.Item key="intransit">In Transit</Menu.Item>
                <Menu.Item key="delivered">Delivered</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
          {record.status}
          </Dropdown.Button>
          </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <Layout>
      <h1 className="page-header">Approved Booking</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default ApprovedBookings;
