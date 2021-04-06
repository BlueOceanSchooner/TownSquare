import React from 'react';

const EventItem = () => {
  return (
    <div className="row border border-dark m-2">
      <div className="col-9 p-2" style={{height: "6em"}}>
        <h5>Event name <span className="badge badge-pill badge-info">Group badge</span></h5>
        <p className="text-justify">Event description that reminds the user why they signed up to go in the first place.</p>
      </div>
      <div className="col-3 border-left border-dark p-2" style={{height: "6em"}}>
        <p className="text-center mb-0">April 1, 2021</p>
        <p className="text-center mt-0 mb-0">4:00 PM ET</p>
        <div className="row justify-content-center">
          <button type="button" className="btn btn-sm btn-secondary">Attend</button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;