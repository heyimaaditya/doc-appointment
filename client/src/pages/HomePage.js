import axios from 'axios';
import React, { useEffect } from 'react'
import Layout from '../components/Layout';
const HomePage = () => {
  const getUserData=async()=>{
    try {
      const res=await axios.post('http://localhost:4000/api/v1/user/getUserData',
      {},
      {
        headers:{
          Authorization:"Bearer " + localStorage.getItem("token")
        }
      }
      );
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(()=>{
    getUserData();
  },[]);
  return (
    <Layout>
      Homepage
    </Layout>
  )
}

export default HomePage