import React from 'react';

const Event = ({ event, formatTime }) => {
  return (
    <div>
      {`${formatTime(event.start_datetime)} - ${formatTime(event.end_datetime)}: ${event.title}`}
    
    </div>
  );
};

export default Event;
