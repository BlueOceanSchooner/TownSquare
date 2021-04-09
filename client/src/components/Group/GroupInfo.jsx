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
      isMember: false,
      isNotMember: false,
    }
  }

  componentDidMount() {

  }

  // Checks if currently logged in user is a member of the group
  checkCurrentUserJoined() {
    const { members, currentUser } = this.props;

    let attendingIds = [];
    members.map((member) => (
      attendingIds.push(member.user_id)
    ))
    console.log(attendingIds);
    console.log(currentUser.user_id);

    var isMember = attendingIds.includes(currentUser.user_id);
    console.log('isMember', isMember);

    return isMember;
  }

  joinGroup(e) {
    const { isMember, isNotMember } = this.state;
    const { currentUser, groupInfo } = this.props;
    axios.post(`/api/users/${currentUser.user_id}/groups/${groupInfo.group_id}`, {
      "status": 1,
    })
    e.target.innerHTML = 'Joined!';
    e.target.style.backgroundColor = '#28a745';
  }

  leaveGroup(e) {
    const { isMember, isNotMember } = this.state;
    const { currentUser, groupInfo } = this.props;
    axios.post(`/api/users/${currentUser.user_id}/groups/${groupInfo.group_id}`, {
      "status": 0,
    })
    e.target.innerHTML = 'Join!';
    e.target.style.backgroundColor = '#007bff';
  }

  hoverOn(e) {
    if (e.target.innerHTML === 'Joined!') {
      e.target.innerHTML = 'Leave?';
    }
  }

  hoverOff(e) {
    if (e.target.innerHTML === 'Leave?') {
      e.target.innerHTML = 'Joined!';
    }
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

            {this.checkCurrentUserJoined() === false ?
            <Button onClick={this.joinGroup} color="primary">Join!</Button> : <Button onClick={this.leaveGroup} color="success" className="leave-group-button" onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>Joined!</Button>}

          </CardBody>
        </Card>
      </div>
    )
  }
}

export default GroupInfo;
