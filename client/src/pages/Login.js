import React from 'react'
import { Form,Input } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/RegisterStyles.css'
const Login=()=>{
  const onfinishHandler=(values)=>{
    console.log(values);
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
          <Form.Item label="Password" name="password">
            <Input type="password" required/> 
          </Form.Item>
          <Link to='/register' className='m-2'>{''}Not a user?go for register</Link>
          <button className='btn btn-primary' type='submit'>Login</button>

        </Form>
      </div>
    </>
  )
}
export default Login;