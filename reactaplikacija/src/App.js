import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginFormPopup from './Login/LoginFormPopup';
import './App.css';
import HomePage from './Home/HomePage';
import Navbar from './Reusable/Navbar';
import Dogadjaji from './Dogadjaji/Dogadjaji';
import Calendar from './Kalendar/Calendar';
import Admin from './Admin/Admin';
import AdminKorisnici from './Admin/AdminKorisnici';

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
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dogadjaji" element={<Dogadjaji />} />    {/*dodato eksportovanje u ics fajl */}

          <Route path="/loginregister" element={<LoginFormPopup setToken={setToken} />} />
          <Route path="/admin/korisnici" element={<AdminKorisnici />} /> 
          <Route path="/admin" element={<Admin />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
