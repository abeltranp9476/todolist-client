import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, useParams } from "react-router-dom";
import Login from './features/login/Login';
import { useNavigate } from 'react-router-dom';
import Navbar from './features/navbar/Navbar';
import { tokenUtils } from './utils/authentication';
import { getUser } from './features/login/loginSlice';
import Home from './features/home/Home';
import Register from './features/register/Register';
import { selectLogin } from './features/login/loginSlice';
import Changepassword from './features/changepassword/Changepassword';
import Notification from './features/notification/Notification';
function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector(selectLogin);


  useEffect(() => {
    const userId = tokenUtils.getUserId();
    dispatch(getUser(userId));
    if (!userId) navigate('/login');
  }, [session.isAutentifiqued])


  return (
    <>
      <Notification />
      <Navbar />
      <Routes>
        <Route path="*" element={<div>404</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Changepassword />} />
      </Routes>
    </>
  );
}

export default App;
