import React from 'react';
import useDogadjaji from '../Reusable/useDogadjaji';
import './Dogadjaji.css';

const Dogadjaji = () => {
  const [dogadjaji] = useDogadjaji();

  // Funkcija za formatiranje vremena u format HH:MM
  const formatVreme = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Funkcija za generisanje niza datuma za narednih 7 dana
  const generateDates = () => {
    const currentDate = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="calendar">
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
                      <div key={event.id}>
                        {`${formatVreme(event.start_datetime)} - ${formatVreme(event.end_datetime)}: ${event.title}`}
                      </div>
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
