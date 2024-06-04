import React from 'react';
import { Button } from 'antd';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';

const InternPage = () => {
  const navigate = useNavigate();

  const handleAddLog = () => {
    navigate('/addlog');
  };

  const handleMyLogs = () => {
    navigate('/mylogs');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <h1 className="text-5xl font-bold mb-12 text-center text-white">Welcome {localStorage.getItem('userName').replace(/"/g, '')}</h1>
      <div className="flex space-x-8">
        <Button 
          type="primary" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-2xl text-xl transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={handleAddLog}
          style={{ height: '60px', minWidth: '150px' }}
        >
          Add Log
        </Button>
        <Button 
          type="default" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-12 rounded-2xl text-xl transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={handleMyLogs}
          style={{ height: '60px', minWidth: '150px' }}
        >
          My Logs
        </Button>
      </div>
    </div>
  );
};

export default InternPage;
