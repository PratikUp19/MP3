import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Logistic from "../components/Logistic";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import "../Home.css";
function Home() {
  const [logistics, setLogistics] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-logistics", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setLogistics(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {logistics.map((logistic) => (
          <Col key={logistic.id} span={8} xs={24} sm={24} lg={8}>
            
          <div className="logistic-card">
          <Logistic logistic={logistic} />
        </div>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
