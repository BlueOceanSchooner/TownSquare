import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import MembersModal from '../Members/MembersModal.jsx';

const GroupInfo = ({ groupInfo, members, userID, memberOnClick }) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://superiorhiking.org/wp-content/uploads/2020/09/SHTA-Homepage_-Castle-Danger.png" alt="Group poster" className="group-poster" />
        <CardBody>
          <CardTitle tag="h5">{groupInfo.group_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">

            <MembersModal event={false} name={groupInfo.group_name} users={members} userID={userID} messageMemberOnClick={memberOnClick} />

            {/* <div>
              {members.map((member) => (
                <span className="group-member" key={member.user_id}>{member.first_name}</span>
              ))}
            </div> */}
          </CardSubtitle>
          <CardText>{groupInfo.description}</CardText>
          <Button>Join!</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default GroupInfo;
