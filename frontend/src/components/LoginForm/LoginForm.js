import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import 'tailwindcss/tailwind.css';

const { Option } = Select;

const LoginForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      // console.log(response);

      if (response.ok) {
        console.log(data.user);
        localStorage.setItem('token', JSON.stringify(data.user.token));
        localStorage.setItem('userID', JSON.stringify(data.user._id));
        localStorage.setItem('userRole', JSON.stringify(data.user.role));
        localStorage.setItem('userName', JSON.stringify(data.user.name));
        if (data.user.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.user.role === 'intern') {
          window.location.href = '/intern';
        }
        message.success(`Login successful! Welcome, ${data.user.name}`);
        
      } else {
        message.error(data.message ||'Login failed. Please try again.');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <Form
        name="register_form"
        className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-2xl"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">Login</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            }
          ]}
        >
          <Input 
            prefix={<MailOutlined className="site-form-item-icon text-gray-500" />} 
            placeholder="Email" 
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon text-gray-500" />}
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>
        
        
        
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: 'Please select your Role!',
            },
          ]}
        >
          <Select 
            placeholder="Select your role" 
            className="custom-select w-full h-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            dropdownClassName="custom-dropdown"
          >
            <Option value="admin">Admin</Option>
            <Option value="intern">Intern</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg h-full"
          >
            Login
          </Button>
          <div className="text-center mt-6">
            <a href="/register" className='text-blue-500 hover:text-blue-700'>Don't have an account? Register</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
