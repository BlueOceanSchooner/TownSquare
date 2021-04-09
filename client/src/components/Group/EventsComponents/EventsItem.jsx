import React from 'react';
import axios from 'axios';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const EventsItem = ({ event, currentUser }) => {
  // const [attending, setAttending] = useState();
  const date = moment(event.time).format("dddd, MMMM Do");
  const time = moment(event.time).format("YYYY, h:mm a");

  const rsvpEvent = () => {
    console.log('attending event!');
    console.log('event', event);
    axios.post(`/api/events/${event.event_id}/attendees`, {
      "user_id": currentUser.user_id,
      "attending": 0,
    });
  }

  return (
    <ListGroupItem className="group-event-item" >
      <Container>
        <Row xs="2">
          <Col xs="9" className="group-event-title">{event.title}</Col>
          <Col xs="3" className="group-event-time">
            <Col>{date}</Col>
            <Col>{time}</Col>
          </Col>
          <Col xs="9" className="group-event-description">{event.description}</Col>
          <Col xs="3" className="group-event-button"><Button outline color="secondary" onClick={rsvpEvent}>Attend</Button></Col>
        </Row>
      </Container>
    </ListGroupItem>
  )
}

export default EventsItem;
