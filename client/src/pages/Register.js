import React from 'react'
import {Form,Input} from 'antd';
import { Link } from 'react-router-dom';
import '../styles/RegisterStyles.css'
const Register=()=>{
  const onfinishHandler=(values)=>{
    console.log(values);
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