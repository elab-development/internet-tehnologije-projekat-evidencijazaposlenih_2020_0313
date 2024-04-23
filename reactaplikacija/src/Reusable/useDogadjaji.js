import { useState, useEffect } from 'react';
import axios from 'axios';

const useDogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dogadjaji');
        setDogadjaji(response.data);
      } catch (error) {
        console.error('Error fetching dogadjaji:', error);
      }
    };

    fetchData();

 
    return () => {
       
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return [dogadjaji, setDogadjaji];
};

export default useDogadjaji;
