import { useState, useEffect } from 'react';
import axios from 'axios';

const useDogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useState([]);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDogadjaji(response.data.events);
      } catch (error) {
        console.error('Error fetching dogadjaji:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return [dogadjaji, setDogadjaji];
};

export default useDogadjaji;
