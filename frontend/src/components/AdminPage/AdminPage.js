import React, { useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import 'tailwindcss/tailwind.css';

const AdminPage = () => {
  const [allInternList, setAllInternList] = useState([]);

  const fetchInternList = async () => {
    try {
      const response = await fetch('/getAllInterns');

      if (response.ok) {
        const data = await response.json();

        if (data.interns && Array.isArray(data.interns)) {
          setAllInternList(data.interns);
          message.success('Intern list fetched successfully');
        } else {
          console.error('Data format is incorrect');
          message.error('Failed to fetch intern list');
        }
      } else {
        console.error('Failed to fetch data');
        message.error('Failed to fetch intern list');
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
      message.error('Failed to fetch intern list');
    }
  };

  const deleteUser = async (email) => {
    try {
      const response = await fetch('/deleteUser', {
        method: 'DELETE',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setAllInternList(allInternList.filter(intern => intern.email !== email));
        message.success('User deleted successfully');
      } else {
        // console.error('Failed to delete user');
        message.error('Failed to delete user');
      }
    } catch (error) {
      // console.error('Failed to delete user', error);
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => deleteUser(record.email)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Intern List</h1>
      <Button
        type="primary"
        onClick={fetchInternList}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
      >
        Get Intern List
      </Button>
      <Table
        columns={columns}
        dataSource={allInternList}
        rowKey="_id"
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
};

export default AdminPage;
