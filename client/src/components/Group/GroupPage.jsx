import React from 'react';
import axios from 'axios';

import GroupInfo from './GroupInfo';
import ActivityList from './ActivityList';

import { Container, Row, Col } from 'reactstrap';

class GroupPage extends React.Component {
  constructor(props) {
    super(props);

    this.getGroupInfo = this.getGroupInfo.bind(this);
    this.state = {
      groupInfo: {},
      members: [],
    }
  }

  componentDidMount() {
    this.getGroupInfo();
  }

  // get information for a group
  getGroupInfo() {
    const { groupId } = this.props;
    // get general group info
    const info = `/api/groups/${groupId}`;
    // get members of a group
    const memb = `/api/groups/${groupId}/members`;

    const requestInfo = axios.get(info);
    const requestMembers = axios.get(memb);

    axios.all([requestInfo, requestMembers])
      .then(axios.spread((...responses) => {
        const responseInfo = responses[0];
        const responseMembers = responses[1];
        console.log('responseInfo', responseInfo.data);
        console.log('responseMembers', responseMembers.data);
        this.setState({
          groupInfo: responseInfo.data,
          members: responseMembers.data,
        });
      }))
  }

  render() {
    const { groupInfo, members } = this.state;
    return (
      <Container className="group-container">
        {/* Group Info */}
        <Row>
          <Col>
            <GroupInfo groupInfo={groupInfo} members={members} />
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
