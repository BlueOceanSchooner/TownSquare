import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import Previews from './Previews.jsx';


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

           <Previews userID={this.props.userID} chats={this.state.chats} active={this.state.active} changeActiveConversation={this.changeActiveConversation}/>

            <div className="conversation">
              <div className="conversation-header">{activeName}</div>
              <div className="conversation-messages">
                {
                  this.state.chats[this.state.active] ?
                  this.state.chats[this.state.active].map(message => {
                    return (
                      <div key={message.dm_id} className={message.sender.user_id === this.props.userID ? "conversation-you" : "conversation-other"}>
                        {message.sender.user_id === this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
                        <span className="name">
                          {`${message.sender.first_name} ${message.sender.last_name}`}
                        </span>
                        <span className="timestamp">
                          {(new Date() - new Date(message.timestamp))/(1000 * 60 * 60 * 24) < 1 ?
                          `${new Date(message.timestamp).getHours()}:${new Date(message.timestamp).getMinutes()}`
                          :
                          new Date(message.timestamp).toDateString().slice(4, 10)}
                        </span>
                        {message.sender.user_id !== this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
                        <br />
                        <span className="message-content">
                          {message.message}
                        </span>
                      </div>
                    )
                  })
                  : null
                }
              </div>

              <Input className={"input"} type="text" onChange={this.updateNewMessage} value={this.state.newMessage}/>
              <Button color="primary" disabled={this.state.newMessage === ''} onClick={this.sendNewMessage}>Send</Button>

            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
