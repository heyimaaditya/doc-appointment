import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";
import { useParams } from "react-router-dom";

import { Form, Row, Col, Input, TimePicker, message } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Handle
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        'http://localhost:4000/api/v1/doctor/updateDoctorProfile',
        {
          ...values,
          userId: user._id,
          officeTime: [
            moment(values.officeTime[0]).format("HH:mm"),
            moment(values.officeTime[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            // must have one space after Bearer . read documentation
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //get Doctor Profile Details

  const getDoctorProfile = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/doctor/getDoctorProfile',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctorProfile();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Profile</h1>

      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            officeTime: [
              moment(doctor.officeTime[0], "HH:mm"),
              moment(doctor.officeTime[1], "HH:mm"),
            ],
          }}
        >
          <h5>Personal Details:</h5>
          <Row gutter={18}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your First Name " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No."
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Phone No. " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Email" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Website " />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Address " />
              </Form.Item>
            </Col>
          </Row>
          <h5>Professional Details:</h5>
          <Row gutter={18}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your specialization " />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Experience " />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Consultation Fee"
                name="consultationFee"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Consultation Fee " />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Office Time"
                name="officeTime"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;