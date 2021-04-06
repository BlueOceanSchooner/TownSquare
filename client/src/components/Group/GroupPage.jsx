import React from 'react';
import GroupInfo from './GroupInfo';
import ActivityList from './ActivityList';

import { Container, Row, Col } from 'reactstrap';

class GroupPage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container className="group-container">
        {/* Group Info */}
        <Row>
          <Col>
            <GroupInfo />
          </Col>
        </Row>
        {/* Activities Tabs */}
        <Row>
          <Col>
            <ActivityList />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GroupPage;
