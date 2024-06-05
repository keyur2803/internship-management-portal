import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Modal, Space, Input, Empty } from 'antd';
import 'tailwindcss/tailwind.css';

const AdminPage = () => {
  const [allInternList, setAllInternList] = useState([]);
  const [selectedInternLogs, setSelectedInternLogs] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackInputVisible, setFeedbackInputVisible] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [feedbackInputValue, setFeedbackInputValue] = useState('');

  useEffect(() => {
    fetchInternList();
  }, []);

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
        message.error('Failed to delete user');
      }
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const showLogsModal = async (intern) => {
    setSelectedIntern(intern);
    try {
      const response = await fetch(`/getmylogs?userID=${intern._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedInternLogs(data.Logs);
        setModalVisible(true);
      } else {
        message.error('Failed to fetch logs. Please try again.');
      }
    } catch (error) {
      message.error('Failed to fetch logs. Please try again.');
    }
  };

  const closeModal = () => {
    setSelectedIntern(null);
    setSelectedInternLogs([]);
    setModalVisible(false);
  };

  const handleFeedbackInputChange = (logID, currentFeedback) => {
    setSelectedLogId(logID);
    setFeedbackInputValue(currentFeedback || '');
    setFeedbackInputVisible(true);
  };

  const handleSaveFeedback = async () => {
    try {
      const response = await fetch(`/submitfeedback`, {
        method: 'POST',
        body: JSON.stringify({ logID: selectedLogId, feedback: feedbackInputValue }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        message.success('Feedback submitted successfully.');
        setFeedbackInputValue('');
        setFeedbackInputVisible(false);

        // Update the logs state to reflect the new feedback
        const updatedLogs = selectedInternLogs.map(log => {
          if (log._id === selectedLogId) {
            return { ...log, feedback: feedbackInputValue };
          }
          return log;
        });
        setSelectedInternLogs(updatedLogs);
      } else {
        message.error('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      message.error('Failed to submit feedback. Please try again.');
    }
  };

  const handleCancelFeedback = () => {
    setSelectedLogId(null);
    setFeedbackInputValue('');
    setFeedbackInputVisible(false);
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
      <Table
        columns={columns}
        dataSource={allInternList}
        rowKey="_id"
        className="bg-white rounded-lg shadow"
        onRow={(record) => ({
          onClick: () => showLogsModal(record),
        })}
      />
      <Modal
        title={`Logs of ${selectedIntern ? selectedIntern.name : ''}`}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {selectedInternLogs.length > 0 ? (
          selectedInternLogs.map(log => (
            <div key={log._id} className="mb-4">
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Starting Time:</strong> {log.startingTime}</p>
              <p><strong>Ending Time:</strong> {log.endingTime}</p>
              <p><strong>Work Summary:</strong> {log.workSummary}</p>
              {log.issue &&<p><strong>Issue:</strong> {log.issue}</p>}
              {log.feedback && <p><strong>Feedback:</strong> {log.feedback}</p>}
              <Space>
                <Button
                  type="default"
                  onClick={() => handleFeedbackInputChange(log._id, log.feedback)}
                  disabled={feedbackInputVisible && selectedLogId === log._id}
                >
                  {feedbackInputVisible && selectedLogId === log._id ? 'Cancel' : 'Feedback'}
                </Button>
                {feedbackInputVisible && selectedLogId === log._id && (
                  <>
                    <Input
                      value={feedbackInputValue}
                      onChange={(e) => setFeedbackInputValue(e.target.value)}
                      onPressEnter={handleSaveFeedback}
                    />
                    <Button type="primary" onClick={handleSaveFeedback}>
                    Save
                    </Button>
                    <Button onClick={handleCancelFeedback}>Cancel</Button>
                  </>
                )}
              </Space>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <Empty description="No logs available" />
        )}
      </Modal>
    </div>
  );
};

export default AdminPage;

