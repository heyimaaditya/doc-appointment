import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          <h4 className="text-center">
            Dr. {doctor.firstName} {doctor.lastName}
          </h4>
        </div>

        <div className="card-body">
          <h5 className="text-center">Personal Details</h5>
          <p>
            <b>Email : </b>
            {doctor.email}
          </p>
          <p>
            <b>Phone : </b>
            {doctor.phone}
          </p>
          <p>
            <b>Website : </b>
            {doctor.website}
          </p>
          <p>
            <b>Address : </b>
            {doctor.address}
          </p>
          <hr />
          <h5 className="text-center">Professional Details</h5>
          <p>
            <b>Specialization : </b>
            {doctor.specialization}
          </p>
          <p>
            <b>Experience : </b>
            {doctor.experience}
          </p>
          {/* <p>
            <b>Fee per Consultation : </b>
            {doctor.consultationFee}
          </p>
          <p>
            <b>Office Time : </b>
            {doctor.officeTime[0]} - {doctor.officeTime[1]}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default DoctorList;