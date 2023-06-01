import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";




function LogisticForm({ onFinish, initivalValues }) {
  return (
    <Form className="form-container" layout="vertical" style={{ border: '1px solid #ccc', padding: '20px' }} onFinish={onFinish} initialValues={{ ...initivalValues, ...(initivalValues && { deparaturAndArrival_timings: [ moment(initivalValues?.deparaturAndArrival_timings[0], "HH:mm"), moment(initivalValues?.deparaturAndArrival_timings[1], "HH:mm"), ], }), }}>
  {/* <h1 className="card-title mt-3">Personal Information</h1> */}
  <Row style={{ marginBottom: '0%' }}>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="First Name"
      name="firstName"
      rules={[{ required: true }]}
    >
      <Input placeholder="First Name" />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Last Name"
      name="lastName"
      rules={[{ required: true }]}
    >
      <Input placeholder="Last Name" />
    </Form.Item>
        </Col>
  </Row>
      <Row style={{ marginBottom: '0px' }}>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Phone Number"
      name="phoneNumber"
      rules={[{ required: true }]}
    >
      <Input placeholder="Phone Number" />
    </Form.Item>
        </Col>
        <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Source"
      name="source"
      rules={[{ required: true }]}
    >
      <Input placeholder="Source" />
    </Form.Item>
  </Col>
      </Row>
      
<Row style={{ marginBottom: '0px' }}>
  
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Destination"
      name="destination"
      rules={[{ required: true }]}
    >
      <Input placeholder="Destination" />
    </Form.Item>
        </Col>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Description"
      name="description"
      rules={[{ required: true }]}
    >
      <Input placeholder="Description" />
    </Form.Item>
  </Col>
      </Row>
      
{/* <hr /> */}
{/* <h1 className="card-title mt-3">Professional Information</h1> */}
<Row style={{ marginBottom: '0px' }}>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Fee Per km"
      name="feePerkm"
      rules={[{ required: true }]}
    >
      <Input placeholder="Fee Per Km" type="number" />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item
      className="form-container"
      required
      label="Available Space"
      name="available_space"
      rules={[{ required: true }]}
    >
      <Input placeholder="Available Space" type="number" />
    </Form.Item>
        </Col>
        
  </Row>
  <Row style={{ marginBottom: '0px' }}>    
  <Col >
    <Form.Item
      className="form-container .ant-time-picker"
      required
      label="Timings"
      name="deparaturAndArrival_timings"
      rules={[{ required: true }]}
    >
      <TimePicker.RangePicker format="HH:mm" />
    </Form.Item>
  </Col>
</Row>
      

<div className="d-flex justify-content-end">
  <Button className="primary-button" htmlType="submit">
    SUBMIT
  </Button>
      </div>
      
</Form>
  );
}

export default LogisticForm;