import React, { useState, useEffect } from 'react';
import useDogadjaji from '../Reusable/useDogadjaji';
import useEventTypes from '../Reusable/useEventTypes';   
import './Dogadjaji.css';
import Event from './Event';

const Dogadjaji = () => {
  const [dogadjaji] = useDogadjaji();
  const [eventTypes] = useEventTypes();  

  const [selectedEventType, setSelectedEventType] = useState(null);

  // Funkcija za formatiranje vremena u format HH:MM
  const formatVreme = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Funkcija za generisanje niza datuma za narednih 7 dana
  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Trenutno prikazanih 7 dana
  const [currentDate, setCurrentDate] = useState(new Date());

  // Funkcija za prikaz prethodnih 7 dana
  const showPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // Funkcija za prikaz sledećih 7 dana
  const showNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const dates = generateDates(currentDate);

  // Funkcija za filtriranje događaja prema odabranom tipu događaja
  const filteredEvents = selectedEventType
    ? dogadjaji.filter((event) => event.event_type.id === selectedEventType)
    : dogadjaji;

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
                    {filteredHourlyEvents.map((event) => (
                      <Event key={event.id} event={event} formatTime={formatVreme} />
                    ))}
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
