import React, { useState } from 'react';
import useDogadjaji from '../Reusable/useDogadjaji';
import './Dogadjaji.css';
import Event from './Event';

const Dogadjaji = () => {
  const [dogadjaji] = useDogadjaji();

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

  return (
    <div className="calendar">
      <div className="navigation">
        <button onClick={showPreviousWeek}>Prethodnih 7 dana</button>
        <button onClick={showNextWeek}>Sledećih 7 dana</button>
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
                const filteredEvents = dogadjaji.filter(
                  (event) =>
                    new Date(event.start_datetime).toLocaleDateString() === date.toLocaleDateString() &&
                    new Date(event.start_datetime).getHours() === hour
                );
                return (
                  <td key={index}>
                    {filteredEvents.map((event) => (
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