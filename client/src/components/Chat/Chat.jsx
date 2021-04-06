import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import Sub_previews from './sub_previews.jsx';
import Sub_conversation from './sub_conversation.jsx';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chats: {},
      active: 0,
      newMessage: ''
    }
    this.getMessages = this.getMessages.bind(this);
    this.openDMs = this.openDMs.bind(this);
    this.changeActiveConversation = this.changeActiveConversation.bind(this);
    this.updateNewMessage = this.updateNewMessage.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  getMessages() {
    axios.get(`/api/users/${this.props.userID}/dms`)
    .then(response => {
      if (this.state.active === 0 && response.data) {
        this.setState({ chats: response.data, active: Object.keys(response.data)[0] })
      }
      this.setState({ chats: response.data })
    })
    .catch(err => console.log('error:', err));
  }

  openDMs() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
    if (!modal) {
      this.getMessages();
    }
  }

  changeActiveConversation(e) {
    this.setState({ active: e.currentTarget.getAttribute('name') });
  }

  updateNewMessage(e) {
    this.setState({ newMessage: e.target.value });
  }

  sendNewMessage() {
    axios.post('/api/dms', {
      sender_id: this.props.userID,
      receiver_id: this.state.active,
      message: this.state.newMessage
    })
    .then(() => {
      this.setState({ newMessage: '' });
      this.getMessages();
    })
    .catch(err => console.log('error:', err));
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
            <Sub_previews userID={this.props.userID} chats={this.state.chats} active={this.state.active} changeActiveConversation={this.changeActiveConversation}/>
            <Sub_conversation userID={this.props.userID} activeName={activeName} chats={this.state.chats} active={this.state.active} newMessage={this.state.newMessage} updateNewMessage={this.updateNewMessage} sendNewMessage={this.sendNewMessage}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
