import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import MembersModal from '../Members/MembersModal.jsx';

class GroupInfo extends React.Component {
  constructor(props) {
    super(props);

    this.checkCurrentUserJoined = this.checkCurrentUserJoined.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);

    this.state = {
      isJoined: false,
    }
  }

  componentDidMount() {
    this.checkCurrentUserJoined();
  }

  // Checks if currently logged in user is a member of the group
  checkCurrentUserJoined() {
    const { members, currentUser } = this.props;

    let attendingIds = [];
    members.map((member) => (
      attendingIds.push(member.user_id)
    ))
    var isMember = attendingIds.includes(currentUser.user_id);
    this.setState({
      isJoined: isMember,
    });
    // returns boolean
    return isMember;
  }

  joinGroup() {
    const { currentUser, groupInfo } = this.props;
    this.setState({
      isJoined: true,
    });
    axios.post(`/api/users/${currentUser.user_id}/groups/${groupInfo.group_id}`, {
      "status": 1,
    })
      .then((result) => {
        console.log('joinGroup POST result:', result);
      })
      .catch((err) => {
        console.log('Join error:', err);
      })
  }

  leaveGroup() {
    const { currentUser, groupInfo } = this.props;
    this.setState({
      isJoined: false,
    });
    axios.post(`/api/users/${currentUser.user_id}/groups/${groupInfo.group_id}`, {
      "status": 0,
    })
      .then((result) => {
        console.log('leaveGroup POST result:', result);
      })
      .catch((err) => {
        console.log('Leave error:', err);
      })
  }

  render() {
    const { groupInfo, members, currentUser, memberOnClick } = this.props;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={`../${groupInfo.image_url}`} alt="Group poster" className="group-poster" />
          <CardBody>
            <CardTitle tag="h5">{groupInfo.group_name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {/* Shows members of the group */}
              <MembersModal event={false} name={groupInfo.group_name} users={members} currentUser={currentUser.user_id} messageMemberOnClick={memberOnClick} />
            </CardSubtitle>
            <CardText>{groupInfo.description}</CardText>
            <div id="this-div"></div>

            {/* {checkCurrentUserJoined() === false ? <Button onClick={toggleJoined} onMouseEnter={hoverOn} onMouseLeave={hoverOff} color="primary">Join!</Button> : <Button onClick={toggleJoined} onMouseEnter={hoverOn} onMouseLeave={hoverOff} color="success" className="group-joined-button">Joined!</Button>} */}

            <Button onClick={this.joinGroup} color="primary">Join :D</Button>

            <Button onClick={this.leaveGroup} color="primary">Leave :(</Button>

          </CardBody>
        </Card>
      </div>
    )
  }
}

export default GroupInfo;
