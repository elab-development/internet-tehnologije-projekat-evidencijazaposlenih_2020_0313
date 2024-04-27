import React, { useState, useEffect } from 'react';
import useDogadjaji from '../Reusable/useDogadjaji';
import useEventTypes from '../Reusable/useEventTypes';   
import './Dogadjaji.css';
import Event from './Event';
import { BsPencilSquare, BsTrash, BsPlus } from 'react-icons/bs'; 
import axios from 'axios';
import ModalEvent from './ModalEvent';

const Dogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useDogadjaji();
  const [eventTypes] = useEventTypes();  
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 

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
    const event = dogadjaji.find((event) => event.id === eventId);
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nije pronađen token u sessionStorage-u.');
        return;
      }

      const response = await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Događaj je uspešno obrisan.');
        setDogadjaji(dogadjaji.filter(event => event.id !== eventId));
      } else {
        console.error('Došlo je do greške prilikom brisanja događaja.');
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom slanja DELETE zahteva:', error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nije pronađen token u sessionStorage-u.');
        return;
      }

      if (selectedEvent) {
        // Ažuriranje postojećeg događaja
        const response = await axios.put(`http://127.0.0.1:8000/api/events/${selectedEvent.id}`, newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log('Događaj je uspešno ažuriran.');
          const updatedEventIndex = dogadjaji.findIndex(event => event.id === selectedEvent.id);
          const updatedDogadjaji = [...dogadjaji];
          updatedDogadjaji[updatedEventIndex] = response.data.event;
          setDogadjaji(updatedDogadjaji);
          setShowModal(false);
          setSelectedEvent(null);
        } else {
          console.error('Došlo je do greške prilikom ažuriranja događaja.');
        }
      } else {
        // Dodavanje novog događaja
        const response = await axios.post('http://127.0.0.1:8000/api/events', newEvent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          console.log('Novi događaj je uspešno dodat.');
          setDogadjaji([...dogadjaji, response.data.event]);
          setShowModal(false);
        } else {
          console.error('Došlo je do greške prilikom dodavanja novog događaja.');
        }
      }
    } catch (error) {
      console.error('Došlo je do greške prilikom slanja POST/PUT zahteva:', error);
    }
  };
  
  function zatvoriModal() {
    setShowModal(false);
    setSelectedEvent(null);
  }
  
  const exportEvents = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nije pronađen token u sessionStorage-u.');
        return;
      }
  
      const response = await axios.get('http://127.0.0.1:8000/api/events/export', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Postavljamo tip odgovora na binarni podatak (blob)
      });
  
      // Kreiramo URL za preuzimanje .ics fajla
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Kreiramo link za preuzimanje .ics fajla
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'events.ics');
      
      // Dodajemo link u DOM i simuliramo klik na njega
      document.body.appendChild(link);
      link.click();
  
      // Uklanjamo link iz DOM-a
      document.body.removeChild(link);
    } catch (error) {
      console.error('Došlo je do greške prilikom izvoza događaja:', error);
    }
  };
  
  const handleEvidentirajPrisustvo = async (eventId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Nije pronađen token u sessionStorage-u.');
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/pristustvo', {
        event_id: eventId,
        napomena: '', 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert('Prisustvo je uspešno evidentirano.');
        // Možete ažurirati stanje aplikacije kako biste oznacili događaj kao prisustvovan
      } else {
        alert('Došlo je do greške prilikom evidentiranja prisustva.');
      }
    } catch (error) {
      alert('Došlo je do greške prilikom slanja POST zahteva za evidentiranje prisustva:', error);
    }
  };

  return (
    <>
      <div className="calendar">
        <button onClick={exportEvents}>Izvezi događaje u .ics fajl</button>

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
          <button onClick={() => setShowModal(true)}><BsPlus /> Dodaj događaj</button>
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
                              {event.event_type.name === 'Nastava' && (
                                <button onClick={() => handleEvidentirajPrisustvo(event.id)}>
                                  Evidentiraj prisustvo
                                </button>
                              )}
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
        {showModal && (
          <ModalEvent
            onSubmit={handleAddEvent}
            eventTypes={eventTypes}
            selectedEvent={selectedEvent} 
            setShowModal={setShowModal}
            onclose={zatvoriModal}
          />
        )}
      </div>
    </>
  );
};

export default Dogadjaji;
