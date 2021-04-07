import React from 'react';
import EventsItem from './EventsItem';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

class EventsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { events } = this.props;
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
