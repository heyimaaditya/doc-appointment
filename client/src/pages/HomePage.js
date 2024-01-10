import React, { useEffect } from 'react'

const HomePage = () => {
  const getUserData=()=>{
    try {
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(()=>{
    getUserData();
  },[]);
  return (
    <div>HomePage</div>
  )
}

export default HomePage