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
    const { events } = this.props;
    const { isModalOpen, selectedEvent } = this.state;

    const eventItems = [];
    events.forEach((event) => {
      eventItems.push((
        <EventItem event={event} updateSelectedEvent={this.updateSelectedEvent} />
      ));
    });

    return (
      <div className="col mr-5">
        <div className="row">
          <div className="col align-self-center text-center text-white bg-primary pt-2">
            <h5>UPCOMING EVENTS</h5>
          </div>
        </div>
        {eventItems}
        {isModalOpen && <EventInfoModal event={selectedEvent} toggleModal={this.toggleModal} isModalOpen={isModalOpen} />}
      </div>

    );
  }
}

export default Events;