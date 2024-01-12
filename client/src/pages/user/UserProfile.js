import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import axios from "axios";
import { useParams } from "react-router-dom";

import { Form, Row, Col, Input, message } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const UserProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [singleUser, setSingleUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Handle
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post(
        'http://localhost:4000/api/v1/user/updateUserProfile',
        {
          ...values,
          userId: user._id,
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

  const getUserProfile = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/getUserProfile',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setSingleUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserProfile();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Profile</h1>

      {singleUser && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...singleUser,
          }}
        >
          <h5>Personal Details:</h5>
          <Row gutter={18}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Name " />
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
              <Form.Item
                label="Password"
                name="password"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Password" />
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

export default UserProfile;