import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import InternPage from './components/InternPage/InternPage';
import AdminPage from './components/AdminPage/AdminPage';
import AddLog from './components/InternPage/AddLog';
import MyLogs from './components/InternPage/MyLogs';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginForm/>,
      },
      {
        path: "/intern",
        element: <InternPage/>,
      },
      {
        path: "/addlog",
        element: <AddLog/>,
      },
      {
        path: "/mylogs",
        element: <MyLogs/>,
      },
      {
        path: "/admin",
        element: <AdminPage/>,
      },
      {
        path: "/login",
        element: <LoginForm/>,
      },
      {
        path: "/register",
        element: <RegisterForm/>
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
