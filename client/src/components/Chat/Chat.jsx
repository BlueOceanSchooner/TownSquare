import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import Sub_previews from './Sub_previews.jsx';
import Sub_conversation from './Sub_conversation.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chats: {},
      chatIDsOrderedByTime: [],
      active: 0,
      allUsers: [],
      newRecipient: false
    }
    this.openDMs = this.openDMs.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.changeActiveConversation = this.changeActiveConversation.bind(this);
    this.changeActiveConversationAfterNewMessage = this.changeActiveConversationAfterNewMessage.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.openNewMessage = this.openNewMessage.bind(this);
    this.closeNewMessage = this.closeNewMessage.bind(this);
  }

  openDMs() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
    if (!modal) {
      this.getMessages();
    }
  }

  getMessages() {
    axios.get(`/api/users/${this.props.userID}/dms`)
    .then(response => {
      if (response.data) {
        var orderedChats = [];
        Object.keys(response.data).forEach(chatID => {
          var chat = response.data[chatID];
          for (var i = 0; i < orderedChats.length; i++) {
            var currentChat = orderedChats[i];
            if (new Date(chat[chat.length - 1].timestamp) > new Date(currentChat[currentChat.length - 1].timestamp)) {
              orderedChats.splice(i, 0, chat);
              return;
            }
          }
          orderedChats.push(chat);
        })
        var chatIDs = orderedChats.map(chat => {
          if (chat[0].sender.user_id === this.props.userID) {
            return chat[0].receiver.user_id;
          }
          return chat[0].sender.user_id;
        });
        this.setState({ chatIDsOrderedByTime: chatIDs, chats: response.data, active: chatIDs[0] })
      }
      this.setState({ chats: response.data })
    })
    .catch(err => console.log('error:', err));
  }

  changeActiveConversation(e) {
    this.setState({ active: e.currentTarget.getAttribute('name') });
  }

  changeActiveConversationAfterNewMessage(id) {
    this.setState({ active: id });
  }

  getAllUsers() {
    axios.get('/api/users')
    .then(response => {
      this.setState({ allUsers: response.data })
    })
    .catch(err => console.log('error:', err));
  }

  openNewMessage() {
    this.setState({ newRecipient: true });
    this.getAllUsers();
  }

  closeNewMessage() {
    this.setState({ newRecipient: false });
  }

  render() {
    if (this.state.chats[this.state.active]) {
      if (this.state.chats[this.state.active][0].sender.user_id === this.props.userID) {
        var activeName = `${this.state.chats[this.state.active][0].receiver.first_name} ${this.state.chats[this.state.active][0].receiver.last_name}`;
      } else {
        var activeName = `${this.state.chats[this.state.active][0].sender.first_name} ${this.state.chats[this.state.active][0].sender.last_name}`;
      }
    } else {
        var activeName = null;
    }
    return (
      <div className="chat-icon">
        <i className="fas fa-comment-alt" onClick={this.openDMs}></i>
        <Modal isOpen={this.state.modal} toggle={this.openDMs} className={"chat-modal"}>
          <ModalHeader className={"modal-header"} toggle={this.openDMs}>
            Messages
          </ModalHeader>
          <ModalBody className={"modal-body"}>

            <Sub_previews userID={this.props.userID} chats={this.state.chats} active={this.state.active} changeActiveConversation={this.changeActiveConversation} openNewMessage={this.openNewMessage} newRecipient={this.state.newRecipient} chatIDsOrderedByTime={this.state.chatIDsOrderedByTime}/>

            <Sub_conversation userID={this.props.userID} activeName={activeName} chats={this.state.chats} active={this.state.active} newRecipient={this.state.newRecipient} allUsers={this.state.allUsers} closeNewMessage={this.closeNewMessage} getMessages={this.getMessages} changeActiveConversationAfterNewMessage={this.changeActiveConversationAfterNewMessage}/>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
