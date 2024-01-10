import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
const Profile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);

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
      <h1>Profile</h1>
    </Layout>
  );
};

export default Profile;