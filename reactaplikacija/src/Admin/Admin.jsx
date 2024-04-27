import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
const Admin = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('Nije pronađen token u sessionStorage-u.');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDepartments(response.data.departments);
      } catch (error) {
        console.error('Došlo je do greške prilikom učitavanja departmana:', error);
      }
    };

    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDepartments = sortBy
    ? [...filteredDepartments].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      })
    : filteredDepartments;

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  return (
    <div className="admin">
      <h2>Admin Panel - Pregled Departmana</h2>
      <input
        type="text"
        placeholder="Pretraga po nazivu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => handleSort('name')}>Sortiraj po nazivu</button>
        <button onClick={() => handleSort('number_of_employees')}>Sortiraj po broju zaposlenih</button>
        <button onClick={() => handleSort('budget')}>Sortiraj po budžetu</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Adresa</th>
            <th>Telefon</th>
            <th>Email</th>
            <th>Rukovodilac</th>
            <th>Broj Zaposlenih</th>
            <th>Budžet</th>
            <th>Godina Osnivanja</th>
            <th>Fasiliteti</th>
          </tr>
        </thead>
        <tbody>
          {sortedDepartments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>{department.address}</td>
              <td>{department.contact_phone}</td>
              <td>{department.contact_email}</td>
              <td>{department.head_of_department}</td>
              <td>{department.number_of_employees}</td>
              <td>{department.budget}</td>
              <td>{department.founding_year}</td>
              <td>{department.facilities}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Admin;
