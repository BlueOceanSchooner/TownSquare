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
      events: [],
      posts: [],
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
    // get events for a group
    const events = `/api/groups/${groupId}/events`;
    // get announcement posts for a group
    const annc = `/api/groups/${groupId}/posts`;

    const requestInfo = axios.get(info);
    const requestMembers = axios.get(memb);
    const requestEvents = axios.get(events);
    const requestPosts = axios.get(annc);

    axios.all([requestInfo, requestMembers, requestEvents, requestPosts])
      .then(axios.spread((...responses) => {
        const responseInfo = responses[0];
        const responseMembers = responses[1];
        const responseEvents = responses[2];
        const responsePosts = responses[3];
        console.log('responseInfo', responseInfo.data);
        console.log('responseMembers', responseMembers.data);
        console.log('responseEvents', responseEvents.data);
        console.log('responsePosts', responsePosts.data);
        this.setState({
          groupInfo: responseInfo.data,
          members: responseMembers.data,
          events: responseEvents.data,
          posts: responsePosts.data,
        });
      }))
  }

  render() {
    const { groupInfo, members, events, posts } = this.state;
    return (
      <Container className="group-container">
        {/* Group Info */}
        <Row>
          <Col>
            <GroupInfo groupInfo={groupInfo} members={members} userID={this.props.userID} memberOnClick={this.props.memberOnClick}/>
          </Col>
        </Row>
        {/* Activities Tabs */}
        <Row>
          <Col>
            <ActivityList events={events} posts={posts}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GroupPage;
