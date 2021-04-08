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
      forum: [],
      user: {},
    }
  }

  componentDidMount() {
    this.getGroupInfo();
  }

  // get information for a group
  getGroupInfo() {
    const { groupId, userId } = this.props;
    // get general group info
    const info = `/api/groups/${groupId}`;
    // get members of a group
    const memb = `/api/groups/${groupId}/members`;
    // get events for a group
    const events = `/api/groups/${groupId}/events`;
    // get announcement posts for a group
    const annc = `/api/groups/${groupId}/posts`;
    // get forum posts for a group
    const forum = `/api/groups/${groupId}/forum`;
    // get user information
    const user = `/api/users/${userId}`;

    const requestInfo = axios.get(info);
    const requestMembers = axios.get(memb);
    const requestEvents = axios.get(events);
    const requestPosts = axios.get(annc);
    const requestForum = axios.get(forum);
    const requestUser = axios.get(user);

    axios.all([requestInfo, requestMembers, requestEvents, requestPosts, requestForum, requestUser])
      .then(axios.spread((...responses) => {
        const responseInfo = responses[0];
        const responseMembers = responses[1];
        const responseEvents = responses[2];
        const responsePosts = responses[3];
        const responseForum = responses[4];
        const responseUser = responses[5];
        // console.log('responseInfo', responseInfo.data);
        // console.log('responseMembers', responseMembers.data);
        // console.log('responseEvents', responseEvents.data);
        // console.log('responsePosts', responsePosts.data);
        // console.log('responseForum', responseForum.data);
        // console.log('responseUser', responseUser.data);
        this.setState({
          groupInfo: responseInfo.data,
          members: responseMembers.data,
          events: responseEvents.data,
          posts: responsePosts.data,
          forum: responseForum.data,
          user: responseUser.data,
        });
      }))
  }

  render() {
    const { groupInfo, members, events, posts, forum, user } = this.state;
    const { groupId, userId } = this.props;
    return (
      <Container className="group-container">
        {/* Group Info */}
        <Row>
          <Col>
            {/* <GroupInfo groupInfo={groupInfo} members={members} /> */}
            <GroupInfo groupInfo={groupInfo} members={members} userID={this.props.userID} memberOnClick={this.props.memberOnClick}/>

          </Col>
        </Row>
        {/* Activities Tabs */}
        <Row>
          <Col>
            <ActivityList events={events} posts={posts} forum={forum} groupId={groupId} userId={userId} user={user} groupInfo={groupInfo}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GroupPage;
