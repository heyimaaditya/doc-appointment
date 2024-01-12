import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from "antd";
import moment from "moment";
import Layout from "../../components/Layout";

const DoctorAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        'http://localhost:4000/api/v1/doctor/doctor-appointments',
        {
          headers: {
            // must have one space after Bearer . read documentation
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Status

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/v1/doctor/update-status',
        { appointmentId: record._id, status },
        {
          headers: {
            // must have one space after Bearer . read documentation
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //antD table Columns

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //key: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //key: "phone",
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span key={`date-${record._id}`}>
          {moment(record.date).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      title: "Appointments",
      dataIndex: "officeTime",
      key: "officeTime",
      render: (text, record) => (
        <span key={`officeTime-${record._id}`}>
          {moment(record.officeTime).format("HH:mm")}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success m-2"
                onClick={() => handleStatus(record, "accepted")}
              >
                Accept
              </button>

              <button
                className="btn btn-danger m-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <h1>AppointmentsPage</h1>
      <Table
        key="appointmentTable"
        columns={columns}
        dataSource={appointments}
      />
    </Layout>
  );
};

export default DoctorAppointmentsPage;