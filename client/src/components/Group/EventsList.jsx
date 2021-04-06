import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem
} from 'reactstrap';

import { Container, Row, Col } from 'reactstrap';

const Events = () => {
  return (
    <div>
      <ListGroup>
        <ListGroupItem>
          <Container>
            <Col>
              <Row>
                Weekend Run
              </Row>
              <Row>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Row>
            </Col>
            <Col>
              <Row>
                April 16, 2021 8:00 AM ET
              </Row>
              <Row>
                Attend?
              </Row>
            </Col>
          </Container>
        </ListGroupItem>
        <ListGroupItem>Wild Wednesday</ListGroupItem>
        <ListGroupItem>Easter Exploration</ListGroupItem>
        <ListGroupItem>Group Hike</ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default Events;
