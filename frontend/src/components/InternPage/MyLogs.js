import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import 'tailwindcss/tailwind.css';

const MyLogs = () => {
  const [logs, setLogs] = useState([]);
  const userID = localStorage.getItem('userID').replace(/"/g, '');

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

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6 ">
      <div className="min-w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 ">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Logs</h1>
        <List
          itemLayout="horizontal"
          dataSource={logs}
          renderItem={log => (
            <List.Item className="hover:bg-gray-100 transition duration-200 ease-in-out p-4 rounded-lg">
              <List.Item.Meta
                title={<span className="text-lg font-semibold text-gray-700">{log.date}</span>}
                description={
                  <div className="text-gray-600">
                    <p className="mb-2"><strong>Starting Time:</strong> {log.startingTime}</p>
                    <p className="mb-2"><strong>Ending Time:</strong> {log.endingTime}</p>
                    <p className="mb-2"><strong>Work Summary:</strong> {log.workSummary}</p>
                    {log.issue && <p className="mb-2"><strong>Issue:</strong> {log.issue}</p>}
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
