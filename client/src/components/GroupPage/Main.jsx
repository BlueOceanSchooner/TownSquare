import React from 'react';
import GroupInfo from './GroupInfo';
import EventsList from './EventsList';
import Announcements from './Announcements';

import { Container, Row, Col } from 'reactstrap';

class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        {/* Group Info */}
        <Row>
          <Col>
            <GroupInfo />
          </Col>
        </Row>
        <Row>
          {/* Upcoming Events */}
          <Col xs="6">
            Events
            <EventsList />
          </Col>
          {/* Announcements / Community Forum */}
          <Col xs="6">
            Announcements / Community Forum
            <Announcements />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
