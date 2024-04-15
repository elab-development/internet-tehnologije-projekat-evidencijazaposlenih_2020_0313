import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFormPopup from './Login/LoginFormPopup';
import './App.css';
import HomePage from './Home/HomePage';
import Navbar from './Reusable/Navbar';

function App() {
  const [token,setToken]=useState(null);
  return (
    <Router>
      <div>
        <Navbar token={token} setToken={setToken}></Navbar>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/loginregister" element={<LoginFormPopup setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
