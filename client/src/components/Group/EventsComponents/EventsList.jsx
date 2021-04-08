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

  }

  render() {
    const { events, groupInfo } = this.props;
    console.log('events', events);
    console.log('groupInfo', groupInfo);
    return (
      <div>
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
