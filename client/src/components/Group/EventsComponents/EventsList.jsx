import React from 'react';
import EventsItem from './EventsItem';
import CreateEventModal from '../../Events/CreateEventModal.jsx';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const { groupInfo, events } = this.props;
    return (
      <div>
        <div>
          <Button onClick={this.toggleModal.bind(this)}>Add Event</Button>
          <CreateEventModal group={groupInfo} isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal.bind(this)}/>
        </div>
        <ListGroup>
          {events.map((event) => (
            <EventsItem key={event.event_id} event={event} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default EventsList;
