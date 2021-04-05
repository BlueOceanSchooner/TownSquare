import React from 'react';
import GroupInfo from './GroupInfo';

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
        <Row className="row">
          {/* Upcoming Events */}
          <Col xs="6">
            Upcoming Events
          </Col>
          {/* Announcements / Community Forum */}
          <Col xs="6">
            Announcements / Community Forum
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
