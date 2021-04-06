import React, { Component, Fragment } from 'react';
import EventItem from './EventItem.jsx';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="col mr-5">
        <div className="row">
          <div className="col align-self-center text-center text-white bg-primary pt-2">
            <h5>UPCOMING EVENTS</h5>
          </div>
        </div>
        <EventItem />
        <EventItem />
      </div>

    );
  }
}

export default Events;