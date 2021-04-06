import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chats: {},
      active: 0
    }
    this.openDMs = this.openDMs.bind(this);
    this.changeActiveConversation = this.changeActiveConversation.bind(this);
  }

  openDMs() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
    if (!modal) {
      axios.get(`/api/users/${this.props.userID}/dms`)
      .then(response => {
        console.log(response);
        var active = response.data ? Object.keys(response.data)[0] : 0;
        this.setState({ chats: response.data, active })
      })
      .catch(err => console.log('error:', err));
    }
  }

  changeActiveConversation(e) {
    this.setState({ active: e.currentTarget.getAttribute('name') });
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
            <div className="messages">
              {Object.keys(this.state.chats).map(otherUserID => {
                let conversation = this.state.chats[otherUserID];
                return (
                  <div className="message" key={otherUserID} name={otherUserID} onClick={this.changeActiveConversation}>
                    <span className={otherUserID === this.state.active ? "active-bar" : null}></span>
                    <i className="user-picture fas fa-user"></i>
                    <div className="content">
                      <span className="other-user-name">
                        {conversation[0].sender.user_id === this.props.userID ? `${conversation[0].receiver.first_name} ${conversation[0].receiver.last_name}` : `${conversation[0].sender.first_name} ${conversation[0].sender.last_name}`}
                      </span>
                      <br/>
                      <span className="last-message">
                        {conversation[conversation.length - 1].sender.user_id === this.props.userID ? "You: " : `${conversation[conversation.length - 1].sender.first_name} ${conversation[conversation.length - 1].sender.last_name}: `}
                        {conversation[conversation.length - 1].message}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

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

              <Input type="textarea"/>

            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
