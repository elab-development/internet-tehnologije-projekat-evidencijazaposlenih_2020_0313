import { useState, useEffect } from 'react';
import axios from 'axios';

const useEventTypes = () => {
  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/event-types', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEventTypes(response.data.event_types);
      } catch (error) {
        console.error('Error fetching event types:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, []); // Empty dependency array to ensure useEffect runs only once

  return [eventTypes, setEventTypes];
};

export default useEventTypes;
