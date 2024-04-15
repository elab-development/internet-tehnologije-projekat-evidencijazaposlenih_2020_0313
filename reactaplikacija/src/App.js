import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFormPopup from './Login/LoginFormPopup';
import './App.css';
import HomePage from './Home/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/loginregister" element={<LoginFormPopup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
