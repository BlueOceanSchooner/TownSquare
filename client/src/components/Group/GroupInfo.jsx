import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import MembersModal from '../Members/MembersModal.jsx';

const GroupInfo = ({ groupInfo, members, currentUser, memberOnClick }) => {

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={`../${groupInfo.image_url}`} alt="Group poster" className="group-poster" />
        <CardBody>
          <CardTitle tag="h5">{groupInfo.group_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {/* <div>
              {members.map((member) => (
                <span className="group-member" key={member.user_id}>{member.first_name}</span>
              ))}
            </div> */}

            <MembersModal event={false} name={groupInfo.group_name} users={members} currentUser={currentUser.user_id} messageMemberOnClick={memberOnClick} />

          </CardSubtitle>
          <CardText>{groupInfo.description}</CardText>
          <Button>Join!</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default GroupInfo;
