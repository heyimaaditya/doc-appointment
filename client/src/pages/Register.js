import React from 'react'
import {Form,Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/RegisterStyles.css'
import axios from 'axios';
const Register=()=>{
  const navigate=useNavigate();
  const onfinishHandler=async(values)=>{
    try {
      const register=await axios.post('http://localhost:4000/api/v1/user/register',values);
      if(register.data.success){
        message.success("registeration successful");
        navigate('/login');

      }else{
        message.error(register.data.message);
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
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required/> 
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required/> 
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/> 
          </Form.Item>
          <Link to='/login' className='m-2'>{''}Already Registered?go for login</Link>
          <button className='btn btn-primary' type='submit'>Register</button>

        </Form>
      </div>
    </>
  )
}
export default Register;