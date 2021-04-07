import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';
import moment from 'moment';

const EventsItem = ({ event }) => {
  const date = moment(event.time).format("dddd, MMMM Do");
  const time = moment(event.time).format("YYYY, h:mm a");

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
          <Col xs="3" className="group-event-button"><Button outline color="secondary">Attend</Button>{' '}</Col>
        </Row>
      </Container>
    </ListGroupItem>
  )
}

export default EventsItem;
