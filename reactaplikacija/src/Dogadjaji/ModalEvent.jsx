
import React, { useState, useEffect } from 'react';
import './Modal.css';

const ModalEvent = ({ onSubmit, eventTypes, selectedEvent, setShowModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start_datetime, setStartDateTime] = useState('');
  const [end_datetime, setEndDateTime] = useState('');
  const [event_type_id, setEventTypeId] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setStartDateTime(selectedEvent.start_datetime);
      setEndDateTime(selectedEvent.end_datetime);
      setEventTypeId(selectedEvent.event_type.id);
    }
  }, [selectedEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, start_datetime, end_datetime, event_type_id });
  };
 
  return (
    <div className="modal2">
      <div className="modal-content2">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Naslov" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="datetime-local" value={start_datetime} onChange={(e) => setStartDateTime(e.target.value)} />
          <input type="datetime-local" value={end_datetime} onChange={(e) => setEndDateTime(e.target.value)} />
          <select value={event_type_id} onChange={(e) => setEventTypeId(parseInt(e.target.value))}>
            <option value="">Izaberite tip događaja</option>
            {eventTypes && eventTypes.map((eventType) => (
              <option key={eventType.id} value={eventType.id}>
                {eventType.name}
              </option>
            ))}
          </select>
          <button type="submit">Dodaj/Izmeni događaj</button>
        </form>
        <button className="modal-close-btn" onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>
  );
};

export default ModalEvent;
