import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFormPopup from './Login/LoginFormPopup';
import './App.css';
import HomePage from './Home/HomePage';
import Navbar from './Reusable/Navbar';
import Dogadjaji from './Dogadjaji/Dogadjaji';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Proveravamo da li postoji token u session storage-u prilikom prvog renderovanja komponente
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 
  return (
    <Router>
      <div>
        <Navbar token={token} setToken={setToken}></Navbar>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dogadjaji" element={<Dogadjaji />} />

          <Route path="/loginregister" element={<LoginFormPopup setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
