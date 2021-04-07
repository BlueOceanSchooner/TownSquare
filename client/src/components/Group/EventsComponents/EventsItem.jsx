import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem, Container, Row, Col
} from 'reactstrap';

const formatDate = function (time) {
  return new Date(time).toLocaleDateString('en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
}

const formatTime = function (time) {
  console.log('event.time:', time);

  const dateTime = new Date(parseInt(time));
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();

  console.log('hours', dateTime.getUTCHours());
  console.log('minutes', dateTime.getUTCMinutes());
  // if (hours > 12) {
  //   hours = hours - 12;
  //   console.log('new hours:', hours);
  // };

  // var date = new Date(parseInt(time));
  // return date.toLocaleTimeString(navigator.language, {
  //   hour: '2-digit',
  //   minute:'2-digit'
  // });

  var date = new Date(parseInt(time));
  var options = { hour: "numeric", minute: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const EventsItem = ({ event }) => {
  const date = formatDate(event.time);
  const time = formatTime(event.time);
  console.log(time);

  return (
    <ListGroupItem className="group-event-item" >
      <Container>
        <Row xs="2">
          <Col xs="9" className="group-event-title">{event.title}</Col>
          <Col xs="3" className="group-event-time">{date}</Col>
          <Col xs="9" className="group-event-description">{event.description}</Col>
          <Col xs="3" className="group-event-button"><Button outline color="secondary">Attend</Button>{' '}</Col>
        </Row>
      </Container>
    </ListGroupItem>
  )
}

export default EventsItem;
