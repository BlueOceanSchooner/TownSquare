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
      <Fragment>
        <div>Events</div>
        <EventItem />
        <EventItem />
      </Fragment>

    );
  }
}

export default Events;