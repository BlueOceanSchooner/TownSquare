import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardHeader, Button, ListGroup, ListGroupItem
} from 'reactstrap';

import { Container, Row, Col } from 'reactstrap';

class Announcements extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="activities-container">
        <ListGroup>
          <CardHeader>
            <span className="group-tab-header">Upcoming Events</span>
            <span className="group-tab-header">|</span>
            <span className="group-tab-header">Announcements</span>
            <span className="group-tab-header">|</span>
            <span className="group-tab-header">Community Forum</span>
          </CardHeader>
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
          <ListGroupItem>Easter Exploration</ListGroupItem>
          <ListGroupItem>Group Hike</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default Announcements;
