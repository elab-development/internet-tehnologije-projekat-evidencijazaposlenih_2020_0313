import React from 'react';

const Event = ({ event, formatTime, handleCellHover, handleCellLeave }) => {
  return (
    <div onMouseEnter={handleCellHover} onMouseLeave={handleCellLeave}>
      {`${formatTime(event.start_datetime)} - ${formatTime(event.end_datetime)}: ${event.title}`}
    </div>
  );
};

export default Event;
