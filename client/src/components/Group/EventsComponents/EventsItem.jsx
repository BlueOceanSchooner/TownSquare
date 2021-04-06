import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const EventsItem = () => {
  return (
    <ListGroupItem>
      <Container>
        <Row>
          <Col>Adrian</Col>
          <Col>Mon, Apr 5, 2021</Col>
        </Row>
        <Row>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
      </Row>
      </Container>
    </ListGroupItem>
  )
}

export default EventsItem;
