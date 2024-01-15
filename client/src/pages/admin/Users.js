import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  // get All users
  const getUsers = async () => {
    try {
      const res = await axios.get(
        'http://localhost:4000/api/v1/admin/getAllUsers',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handleRemoveUser
  const handleRemoveUser = async (record) => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/admin/removeUser',
        { userId: record._id }, // Assuming _id is the user ID
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getUsers(); // Refresh the user list after removal
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //antD table Columns

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "isDoctor",
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },

    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.isAdmin ? null : record.isDoctor ? ( // If user is admin, show nothing
            // If user is a doctor, show the button
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveUser(record)}
            >
              Remove
            </button>
          ) : (
            // For other users, show the same button
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveUser(record)}
            >
              Remove
            </button>
          )}
          {/* <button className="btn btn-danger">Not Accepted</button> */}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users list</h1>

      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default Users;