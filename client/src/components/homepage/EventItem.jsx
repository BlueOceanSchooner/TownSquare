import React from 'react';

const EventItem = ({ event, updateSelectedEvent }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let date = new Date(event.time);
  const hour = `${date.getHours()}:${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;
  date = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className="row border border-dark m-2" style={{cursor: 'pointer'}} onClick={() => updateSelectedEvent(event)}>
      <div className="col-9 p-2" style={{height: "6em"}}>
        <h5>{event.title} <span className="badge badge-pill badge-info">{event.group.group_name}</span></h5>
        <p className="text-justify">{event.description}</p>
      </div>
      <div className="col-3 border-left border-dark p-2" style={{height: "6em"}}>
        <p className="text-center mb-0">{date}</p>
        <p className="text-center mt-0 mb-0">{hour}</p>
        <div className="row justify-content-center">
          <button type="button" className="btn btn-sm btn-success">Attending</button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;