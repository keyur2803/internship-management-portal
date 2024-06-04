import React, { useState } from 'react';
import { Form, Input, Button, message, TimePicker, DatePicker } from 'antd';
import 'tailwindcss/tailwind.css';
import moment from 'moment';

const AddLog = () => {
  const [timeSelected, setTimeSelected] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      if (!timeSelected) {
        message.error('Please select starting and ending times.');
        return;
      }

      const formattedValues = {
        ...values,
        startingTime: values.startingTime.format('HH:mm'),
        endingTime: values.endingTime.format('HH:mm'),
        date: values.date.format('YYYY-MM-DD'),
        userID: localStorage.getItem('userID').replace(/"/g, ''),
      };

      const response = await fetch('/addlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Athorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formattedValues),
      });

      const data = await response.json();
      if (response.ok) {
        message.success('Log added successfully!');
        form.resetFields();
        console.log(data);
      } else {
        message.error('Failed to add log. Please try again.');
      }
    } catch (error) {
      message.error('Failed to add log. Please try again.');
    }
  };

  const handleTimeChange = (time, timeString) => {
    if (time) {
      setTimeSelected(true);
    }
  };

  const handleDateOpenChange = (open) => {
    setDateOpen(open);
  };

  const [form] = Form.useForm();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <Form
        form={form}
        name="add_log_form"
        className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-2xl"
        initialValues={{
          date: moment(),
        }}
        onFinish={onFinish}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">Add Log</h1>

        <Form.Item
          name="startingTime"
          rules={[
            {
              required: true,
              message: 'Please input your Starting Time!',
            },
          ]}
        >
          <TimePicker
            // format="HH-mm"
            placeholder='Starting Time'
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleTimeChange}
          />
        </Form.Item>
        
        <Form.Item
          name="endingTime"
          type="time"
          rules={[
            {
              required: true,
              message: 'Please input your Ending Time!',
            },
          ]}
        >
          <TimePicker
            // format="HH:mm"
            placeholder='Ending Time'
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleTimeChange}
          />
        </Form.Item>
        
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: 'Please input the Date!',
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            open={dateOpen}
            onOpenChange={handleDateOpenChange}
          />
        </Form.Item>
        
        <Form.Item
          name="workSummary"
          rules={[
            {
              required: true,
              message: 'Please input your Work Summary!',
            },
          ]}
        >
          <Input 
            placeholder="Work Summary" 
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>

        <Form.Item
          name="issue"
        >
          <Input 
            placeholder="Issue (Optional)" 
            className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg h-full"
          >
            Add Log
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLog;
