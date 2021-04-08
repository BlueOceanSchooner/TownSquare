import React, { Component, Fragment } from 'react';
import EventItem from './EventItem.jsx';
import EventInfoModal from './EventInfoModal.jsx';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedEvent: null
    };
    this.updateSelectedEvent = this.updateSelectedEvent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  updateSelectedEvent(event) {
    this.setState({
      selectedEvent: event,
      isModalOpen: true
    });
  }

  toggleModal() {
    this.setState({
      selectedEvent: null,
      isModalOpen: false
    });
  }

  render() {
    const { events, chatOnClick, userID } = this.props;
    const { isModalOpen, selectedEvent } = this.state;

    const eventItems = [];
    let keyCount = 0;
    events.forEach((event) => {
      eventItems.push((
        <EventItem key={keyCount++} event={event} updateSelectedEvent={this.updateSelectedEvent} />
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