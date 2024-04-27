import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar({ token, setToken }) {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToken(null);
      sessionStorage.clear();
      history('/loginregister');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Proveravamo da li postoji admin u session storage-u
  const isAdmin = sessionStorage.getItem('admin') === '1';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-item">Pocetna</Link>
      {token ? (
        <>
          {isAdmin && (
            <>
              <Link to="/admin" className="navbar-item">Admin</Link>
              <Link to="/admin/korisnici" className="navbar-item">Korisnici</Link>
              <Link to="/admin/statistike" className="navbar-item">Statistike</Link>
            </>
          )}
          <Link to="/dogadjaji" className="navbar-item">Moj raspored</Link>
          <Link to="/calendar" className="navbar-item">Kalendar</Link>
          <button onClick={handleLogout} className="navbar-item">Logout</button>
        </>
      ) : (
        <Link to="/loginregister" className="navbar-item">Prijava</Link>
      )}
    </nav>
  );
}

export default Navbar;
