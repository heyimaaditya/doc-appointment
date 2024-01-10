import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
// import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [officeTime, setOfficeTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();

  const { user } = useSelector((state) => state.user);

  // get Doctors Data

  const getUserData = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:4000/api/v1/user/getUserData ",
        'http://localhost:4000/api/v1/doctor/getDoctorById',
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

  // handle  Booking
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !officeTime) {
        return message.error("Date & Office time required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/book-appointment',

        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          officeTime: officeTime,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // handleAppointmentAvailability

  const handleAppointmentAvailability = async () => {
    try {
      setIsAvailable(true);
      if (!date && !officeTime) {
        return message.error("Date & Office time required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        'http://localhost:4000/api/v1/user/booking-availability',

        {
          doctorId: params.doctorId,
          date: date,
          officeTime: officeTime,
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
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
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
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(value);
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) =>
                  // setOfficeTime(
                  //   values && values.length === 2
                  //     ? [
                  //         moment(values[0]).format("HH:mm"),
                  //         moment(values[1]).format("HH:mm"),
                  //       ]
                  //     : null
                  // )
                  {
                    setIsAvailable(false);
                    setOfficeTime(value);
                  }
                }
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAppointmentAvailability}
              >
                Check Availability
              </button>
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;