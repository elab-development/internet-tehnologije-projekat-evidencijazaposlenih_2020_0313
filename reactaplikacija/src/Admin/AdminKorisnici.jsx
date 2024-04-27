import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminKorisnici.css';  

const AdminKorisnici = () => {
  const [zaposleni, setZaposleni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchZaposleni = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setZaposleni(response.data.employees);
      } catch (error) {
        console.error('Došlo je do greške prilikom učitavanja zaposlenih:', error);
      }
    };

    if (token) {
      fetchZaposleni();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZaposleni(prevZaposleni => prevZaposleni.filter(zaposlen => zaposlen.id !== id));
    } catch (error) {
      console.error('Došlo je do greške prilikom brisanja zaposlenog:', error);
    }
  };

  const filteredZaposleni = zaposleni.filter((zaposlen) =>
    zaposlen.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zaposlen.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zaposlen.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Admin Panel - Pregled Zaposlenih</h2>
      <input
        className="admin-search"
        type="text"
        placeholder="Pretraga po imenu, prezimenu ili emailu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Odeljenje</th>
            <th>Obriši</th>
          </tr>
        </thead>
        <tbody>
          {filteredZaposleni.map((zaposlen) => (
            <tr key={zaposlen.id}>
              <td>{zaposlen.id}</td>
              <td>{zaposlen.firstName}</td>
              <td>{zaposlen.lastName}</td>
              <td>{zaposlen.email}</td>
              <td>{zaposlen.department.name}</td>
              <td>
                <button className="admin-delete-btn" onClick={() => handleDelete(zaposlen.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminKorisnici;
