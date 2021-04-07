import React from 'react';
import Member from './MessageMember.jsx';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const MembersModal = ({ event, name, users }) => {
  if (event) {
    var ending = ` going to ${name}`;
  } else {
    var ending = ` part of ${name}`;
  }

  if (users.length === 1) {
    var names = `${user.first_name} ${user.last_name} is`;
  } else if (users.length < 4) {
    var names = users.reduce((names, user, index) => {
      var name = `${user.first_name} ${user.last_name}`;
      if (index === users.length - 2) {
        return names + `${name}, and `
      }
      if (index === users.lenth - 1) {
        return names + `${name} are`
      }
      return names + `${name}, `
    }, '')
  } else {
    var names = `${users[0].first_name} ${users[0].last_name}, ${users[1].first_name} ${users[1].last_name}, and ${users.length - 2} others are`
  }

  var description = names + ending;

  // console.log(description);
  return (
    <div>
      {description}
         {/* <i className="fas fa-comment-alt" onClick={onClick}></i>
        <Modal isOpen={this.props.modal} toggle={onClick} className={"chat-modal"}>
          <ModalHeader className={"modal-header"} toggle={onClick}>
            Messages
          </ModalHeader>
          <ModalBody className={"modal-body"}>

            <Sub_previews
              userID={this.props.userID}
              chats={this.state.chats}
              active={activeID}
              changeActiveConversation={this.changeActiveConversation}
              openNewMessage={this.openNewMessage}
              newRecipient={newRecipient}
              chatIDsOrderedByTime={this.state.chatIDsOrderedByTime}
              getProperTimestamp={this.getProperTimestamp}
            />

            <Sub_conversation
              userID={this.props.userID}
              activeName={activeName}
              chats={this.state.chats}
              active={activeID}
              newRecipient={newRecipient}
              newRecipientID={this.state.newRecipientID}
              allUsers={this.state.allUsers}
              closeNewMessage={this.closeNewMessage}
              memberNameClick={Boolean(this.props.chatMemberID) && !this.state.newMessageViaNameClickClose && !this.state.newRecipientChanged}
              newMessage={this.state.newMessage}
              newMessageChats={this.state.newMessageChats}
              changeNewRecipient={this.changeNewRecipient}
              updateNewMessage={this.updateNewMessage}
              sendNewMessage={this.sendNewMessage}
              getProperTimestamp={this.getProperTimestamp}
            />

          </ModalBody>
        </Modal>
      </div>
    <div name={id} onClick={onClick} className={'message-member'}>
      {name} */}
    </div>
  );
};

export default MembersModal;
