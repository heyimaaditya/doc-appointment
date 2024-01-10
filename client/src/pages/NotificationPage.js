import React from "react";
import Layout from "./../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //handle MarkAll read function
  const handleMarkAllread = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/get-all-notification',
        { userId: user._id },
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong Mark All read notification");
    }
  };

  //handle DeleteAllread Notification
  const handleDeleteAllReadNotification = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/delete-all-notification',
        { userId: user._id },
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong in Delete AllRead Notification");
    }
  };

  return (
    <Layout>
      <h3 className="p-3 text-center"> Notification Page</h3>
      <Tabs>
        <Tabs.TabPane tab="Unread Notification" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleMarkAllread}
              style={{ cursor: "pointer" }}
            >
              Mark all Read
            </h4>
          </div>

          {user?.notification.map((notificationMessage, index) => (
            <div className="card" key={index} style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={notificationMessage.onClickPath}
              >
                {notificationMessage.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read Notification" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-danger"
              onClick={handleDeleteAllReadNotification}
              style={{ cursor: "pointer" }}
            >
              Delete all Read notification
            </h4>
          </div>
          {user?.seenNotification.map((notificationMessage, index) => (
            <div className="card" key={index} style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={notificationMessage.onClickPath}
              >
                {notificationMessage.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;