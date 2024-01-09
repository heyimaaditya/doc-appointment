import React from 'react'
import { Form,Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterStyles.css'
import axios from 'axios';
const Login=()=>{
  const navigate=useNavigate();
  const onfinishHandler=async(values)=>{
    try {
      const res=await axios.post('http://localhost:4000/api/v1/user/login',values);
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        message.success("Login successful");
        navigate('/');

      }else{
        message.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
      
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form className='register-form' layout="vertical" onFinish={onfinishHandler}>
          <h3 className='text-center'>Login Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required/> 
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required/> 
          </Form.Item>
          
          <Link to='/register' className='m-2'>{''}Not a user?go for register</Link>
          <button className='btn btn-primary' type='submit'>Login</button>

        </Form>
      </div>
    </>
  )
}
export default Login;