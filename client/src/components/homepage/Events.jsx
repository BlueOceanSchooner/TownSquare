import React, { Component, Fragment } from 'react';
import EventItem from './EventItem.jsx';
import EventInfoModal from './EventInfoModal.jsx';
import axios from 'axios';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedEvent: null,
    };
    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateRSVP = this.updateRSVP.bind(this);
  }

  updateSelectedEvent(event) {
    this.setState({
      selectedEvent: event,
      isModalOpen: true,
      updatedEventId: null
    });
  }

  toggleModal() {
    this.setState({
      selectedEvent: null,
      isModalOpen: false
    });
  }

  updateRSVP(event_id, attending) {
    console.log('UPDATE RSVP CLICKED!');
    console.log('EVENT ID: ', event_id);
    console.log('ATTENDING: ', attending);
    attending = attending === 1 ? 0 : 1;
    console.log('ATTENDING UPDATED: ', attending);
    const { userID } = this.props;
    console.log('USER ID ', userID);
    axios.post(`/api/events/${event_id}/attendees`, {
      user_id: userID,
      attending
    })
      .then((results) => {
        console.log('RESULTS: ', results.data);
        this.setState({
          updatedEventId: event_id
        })
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { events, chatOnClick, userID } = this.props;
    const { isModalOpen, selectedEvent, updatedEventId } = this.state;

    const eventItems = [];
    let keyCount = 0;
    events.forEach((event) => {
      eventItems.push((
        <EventItem key={keyCount++} event={event} updateSelectedEvent={this.updateSelectedEvent} updateRSVP={this.updateRSVP} userID={userID} updatedEventId={updatedEventId} />
      ));
    });

    return (
      <div className="col mr-5">
        <div className="row">
          <div className="col align-self-center text-center text-white bg-secondary rounded-pill pt-2">
            <h5>UPCOMING EVENTS</h5>
          </div>
        </div>
        {eventItems}
        {isModalOpen && <EventInfoModal event={selectedEvent} toggleModal={this.toggleModal} isModalOpen={isModalOpen} chatOnClick={chatOnClick} userID={userID} />}
      </div>

    );
  }
}

export default Events;