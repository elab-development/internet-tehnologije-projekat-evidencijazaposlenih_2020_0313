import React, { useState, useEffect } from 'react';
import useDogadjaji from '../Reusable/useDogadjaji';
import useEventTypes from '../Reusable/useEventTypes';   
import './Dogadjaji.css';
import Event from './Event';
import { BsPencilSquare, BsTrash, BsPlus } from 'react-icons/bs'; 
import axios from 'axios';

const Dogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useDogadjaji();
  const [eventTypes] = useEventTypes();  
  const [selectedEventType, setSelectedEventType] = useState(null);

  const formatVreme = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const showPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const showNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const dates = generateDates(currentDate);

  const filteredEvents = selectedEventType
    ? dogadjaji.filter((event) => event.event_type.id === selectedEventType)
    : dogadjaji;

  const handleEditEvent = (eventId) => {
    // Implementacija za izmenu događaja
    console.log(`Izmena događaja sa ID: ${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Dobavljanje tokena iz sessionStorage-a
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nije pronađen token u sessionStorage-u.');
        return;
      }

      // Slanje DELETE zahteva
      const response = await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Provera odgovora
      if (response.status === 200) {
        console.log('Događaj je uspešno obrisan.');
        // Ažuriranje stanja u lokalnoj memoriji
        setDogadjaji(dogadjaji.filter(event => event.id !== eventId));
      } else {
        console.error('Došlo je do greške prilikom brisanja događaja.');
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom slanja DELETE zahteva:', error);
    }
  };

  return (
    <div className="calendar">
      <div className="navigation">
        <button onClick={showPreviousWeek}>Prethodnih 7 dana</button>
        <button onClick={showNextWeek}>Sledećih 7 dana</button>
        <select onChange={(e) => setSelectedEventType(parseInt(e.target.value))}>
          <option value={null}>Svi tipovi</option>
          {eventTypes.map((eventType) => (
            <option key={eventType.id} value={eventType.id}>
              {eventType.name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            {dates.map((date, index) => (
              <th key={index}>{date.toLocaleDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(24)].map((_, hour) => (
            <tr key={hour}>
              <td>{`${hour.toString().padStart(2, '0')}:00`}</td>
              {dates.map((date, index) => {
                const filteredHourlyEvents = filteredEvents.filter(
                  (event) =>
                    new Date(event.start_datetime).toLocaleDateString() === date.toLocaleDateString() &&
                    new Date(event.start_datetime).getHours() === hour
                );
                return (
                  <td key={index}>
                    {filteredHourlyEvents.length > 0 ? (
                      <div>
                        {filteredHourlyEvents.map((event) => (
                          <div key={event.id}>
                            <Event event={event} formatTime={formatVreme} />
                            <button onClick={() => handleEditEvent(event.id)}>
                              <BsPencilSquare />
                            </button>
                            <button onClick={() => handleDeleteEvent(event.id)}>
                              <BsTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                       <></>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dogadjaji;
