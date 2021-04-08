import React from 'react';
import MessageMember from './MessageMember.jsx';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class MembersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { users, name, event, userID, messageMemberOnClick } = this.props;

    if (!users.length) {
      return null;
    }

    if (event) {
      var ending = `going to ${name}`;
    } else {
      if (users.length === 1) {
        var ending = `a member of ${name}`;
      } else {
        var ending = `members of ${name}`;
      }
    }

    if (users.length === 1) {
      const name = `${users[0].first_name} ${users[0].last_name}`
      return (
        <div>
          <MessageMember style={{ display: "inline-block" }} name={name} id={users[0].user_id} onClick={messageMemberOnClick} userID={userID}/>
          <span>
            {users[0].user_id === userID ? ` are ${ending}` : ` is ${ending}`}
          </span>
        </div>
      )
    }

    if (users.length === 2) {
      if (users.some(user => user.user_id === userID)) {
        var first = users.filter(user => user.user_id === userID)[0];
        var second = users.filter(user => user.user_id !== userID)[0];
      } else {
        var first = users[0];
        var second = users[1];
      }
      return (
        <div>
          <MessageMember style={{ display: "inline-block" }} name={`${first.first_name} ${first.last_name}`} id={first.user_id} onClick={messageMemberOnClick} userID={userID}/>
          {' and '}
          <MessageMember style={{ display: "inline-block" }} name={`${second.first_name} ${second.last_name}`} id={second.user_id} onClick={messageMemberOnClick} userID={userID}/>
          {` are ${ending}`}
        </div>
      )
    }

    if (users.length === 3) {
      if (users.some(user => user.user_id === userID)) {
        var first = users.filter(user => user.user_id === userID)[0];
        var second = users.filter(user => user.user_id !== userID)[0];
        var third = users.filter(user => user.user_id !== userID)[1];
      } else {
        var first = users[0];
        var second = users[1];
        var third = users[2];
      }
      return (
        <div>
          <MessageMember style={{ display: "inline-block" }} name={`${first.first_name} ${first.last_name}`} id={first.user_id} onClick={messageMemberOnClick} userID={userID}/>
          {', '}
          <MessageMember style={{ display: "inline-block" }} name={`${second.first_name} ${second.last_name}`} id={second.user_id} onClick={messageMemberOnClick} userID={userID}/>
          {', and '}
          <MessageMember style={{ display: "inline-block" }} name={`${third.first_name} ${third.last_name}`} id={third.user_id} onClick={messageMemberOnClick} userID={userID}/>
          {` are ${ending}`}
        </div>
      )
    }

    if (users.some(user => user.user_id === userID)) {
      var first = users.filter(user => user.user_id === userID)[0];
      var second = users.filter(user => user.user_id !== userID)[0];
    } else {
      var first = users[0];
      var second = users[1];
    }

    return (
      <div>
        <MessageMember style={{ display: "inline-block" }} name={`${first.first_name} ${first.last_name}`} id={first.user_id} onClick={messageMemberOnClick} userID={userID}/>
        {', '}
        <MessageMember style={{ display: "inline-block" }} name={`${second.first_name} ${second.last_name}`} id={second.user_id} onClick={messageMemberOnClick} userID={userID}/>
        {', and '}
        <span onClick={this.toggleModal} className="members-description" style={{ cursor: "pointer", textDecoration: "underline" }}>
          {`${users.length - 2} others`}
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={"members-modal"}>
            <ModalHeader toggle={this.toggleModal}>
              {`Members in ${name}`}
            </ModalHeader>
            <ModalBody>
              {users.some(user => user.user_id === userID) ?
              <MessageMember style={{ display: "inline-block" }} name={''} id={userID} onClick={messageMemberOnClick} userID={userID}/>
              : null}
              {users.filter(user => user.user_id !== userID).map(user => <MessageMember key={user.user_id} name={`${user.first_name} ${user.last_name}`} id={user.user_id} onClick={messageMemberOnClick} userID={userID}/>)}
            </ModalBody>
          </Modal>
        </span>
        <span>{` are ${ending}`}</span>
      </div>
    );
  }
}

export default MembersModal;
