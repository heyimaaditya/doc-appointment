import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";

const BookingPage = () => {
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [officeTime, setOfficeTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  // get Doctors Data

  const getUserData = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:8080/api/v1/user/getUserData ",
        `${process.env.REACT_APP_BASE_URL}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            // must have one space after Bearer . read documentation
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1> Booking Page</h1>

      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>

            <h4>Fee per Consultation : {doctors.consultationFee}</h4>
            <h4>
              Office Time :
              {doctors.officeTime && doctors.officeTime.length === 2
                ? `${doctors.officeTime[0]} - ${doctors.officeTime[1]}`
                : "Not specified"}
            </h4>

            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker.RangePicker
                className="m-2"
                format="HH:mm"
                onChange={(values) =>
                  setOfficeTime(
                    values && values.length === 2
                      ? [
                          moment(values[0]).format("HH:mm"),
                          moment(values[1]).format("HH:mm"),
                        ]
                      : null
                  )
                }
              />
              <button className="btn btn-primary">Check Availability</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;