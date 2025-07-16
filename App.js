import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Editor from './components/Editor';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/editor" /> : <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/editor" element={isLoggedIn ? <Editor /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
