import React, { useEffect, useState } from 'react';
import { List, message, Button, Input } from 'antd';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

const MyLogs = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID').replace(/"/g, '');

  const handleAddLog = () => {
    navigate('/addlog');
  };


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`/getmylogs?userID=${userID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.Logs);
          setLogs(data.Logs);
        } else {
          message.error('Failed to fetch logs. Please try again.');
        }
      } catch (error) {
        message.error('Failed to fetch logs. Please try again.');
      }
    };

    fetchLogs();
  }, [userID]);

  const handleDelete = async (logID) => {
    try {
      const response = await fetch(`/deletelog`, {
        method: 'DELETE',
        body: JSON.stringify({ logID }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        message.success('Log deleted successfully.');
        setLogs(logs.filter(log => log._id !== logID));
      } else {
        message.error('Failed to delete log. Please try again.');
      }
    } catch (error) {
      message.error('Failed to delete log. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Logs</h1>
        <div className="flex justify-end mb-8">
          <Button 
            type="primary" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl h-full"
            onClick={handleAddLog}
          >
            Add Log
          </Button>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={logs}
          renderItem={log => (
            <List.Item
              actions={[
                <Button 
                  type="primary" 
                  danger 
                  onClick={() => handleDelete(log._id)}
                  className="hover:bg-red-600"
                >
                  Delete
                </Button>,
              ]}
              className="hover:bg-gray-100 transition duration-200 ease-in-out p-4 rounded-lg"
            >
              <List.Item.Meta
                title={<span className="text-lg font-semibold text-gray-700">{log.date}</span>}
                description={
                  <div className="text-gray-600">
                    <p className="mb-2"><strong>Starting Time:</strong> {log.startingTime}</p>
                    <p className="mb-2"><strong>Ending Time:</strong> {log.endingTime}</p>
                    <p className="mb-2"><strong>Work Summary:</strong> {log.workSummary}</p>
                    {log.issue && <p className="mb-2"><strong>Issue:</strong> {log.issue}</p>}
                    {log.feedback && <p className="mb-2"><strong>Feedback:</strong> {log.feedback}</p>}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MyLogs;
