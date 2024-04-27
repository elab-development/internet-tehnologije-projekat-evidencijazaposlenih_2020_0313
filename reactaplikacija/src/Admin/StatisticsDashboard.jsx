import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaBuilding, FaUserTie } from 'react-icons/fa';
import axios from 'axios';
import { Chart } from 'chart.js/auto'; 
import './Statistike.css';
const StatisticsDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatistics(response.data);
      } catch (error) {
        console.error('Došlo je do greške prilikom učitavanja statistika:', error);
      }
    };

    if (token) {
      fetchStatistics();
    }
  }, [token]);

  return (
    <div className="statistics-dashboard">
      <h2>Statistike</h2>
      {statistics && (
        <div className="statistics-container">
          <div className="statistic">
            <FaUsers className="statistic-icon" />
            <div className="statistic-info">
              <div className="statistic-value">{statistics.total_employees}</div>
              <div className="statistic-label">Ukupno zaposlenih</div>
            </div>
          </div>
          <div className="statistic">
            <FaBuilding className="statistic-icon" />
            <div className="statistic-info">
              <div className="statistic-value">{statistics.department_count}</div>
              <div className="statistic-label">Broj katedri</div>
            </div>
          </div>
          <div className="statistic">
            <FaUserTie className="statistic-icon" />
            <div className="statistic-info">
              <div className="statistic-value">{statistics.total_admins}</div>
              <div className="statistic-label">Ukupno administratora</div>
            </div>
          </div>
         
        </div>
      )}
      {statistics && statistics.users_per_department.length > 0 && (
        <div className="chart-container">
          <Bar
            data={{
              labels: statistics.users_per_department.map((item) => item.name),
              datasets: [
                {
                  label: 'Broj zaposlenih po departmanu',
                  data: statistics.users_per_department.map((item) => item.users_count),
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatisticsDashboard;
