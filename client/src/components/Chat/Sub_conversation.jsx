import React from 'react';
import axios from 'axios';
import { Button, Input } from 'reactstrap';
import Select from 'react-select';

class Sub_conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecipientID: null,
      newMessageChats: [],
      newMessage: ''
    }
    this.changeNewRecipient = this.changeNewRecipient.bind(this);
    this.updateNewMessage = this.updateNewMessage.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  componentDidUpdate() {
    var messageBody = document.querySelector('.chat-modal .modal-body .conversation-messages');
    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  changeNewRecipient(e) {
    this.setState({ newRecipientID: e });
    if (this.props.chats[e.value]) {
      this.setState({ newMessageChats: this.props.chats[e.value] });
    } else {
      this.setState({ newMessageChats: [] });
    }
  }

  updateNewMessage(e) {
    this.setState({ newMessage: e.target.value });
  }

  sendNewMessage() {
    if (this.props.newRecipient) {
      var receiver_id = this.state.newRecipientID.value;
    } else {
      var receiver_id = this.props.active;
    }
    axios.post('/api/dms', {
      sender_id: this.props.userID,
      receiver_id,
      message: this.state.newMessage
    })
    .then(() => {
      this.setState({ newMessage: '' });
      this.props.getMessages();
      if (this.props.newRecipient) {
        this.props.changeActiveConversationAfterNewMessage(this.state.newRecipientID.value);
        this.props.closeNewMessage();
      }
    })
    .catch(err => console.log('error:', err));
  }

  renderConversationMessages(chats) {
    return chats.map(message => {
      return (
        <div key={message.dm_id} className={message.sender.user_id === this.props.userID ? "conversation-you" : "conversation-other"}>
        {message.sender.user_id === this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
        <div className="conversation-content">
          <span className="name">
            {`${message.sender.first_name} ${message.sender.last_name}`}
          </span>
          <br/>
          <span className="timestamp">
            {this.props.getProperTimestamp(message.timestamp)}
          </span>
          <br />
          <span className="message-content">
            {message.message}
          </span>
        </div>
          {message.sender.user_id !== this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
        </div>
      )
    })
  }

  render() {
    const { userID, activeName, chats, active, newRecipient, allUsers, closeNewMessage } = this.props;
    const { newMessage, newMessageChats } = this.state;

    if (newRecipient) {
      const options = allUsers.filter(user => user.user_id !== userID).map(user => {
        return (
          { value: user.user_id, label: `${user.first_name} ${user.last_name}`}
        )
      });
      return (
        <div className="conversation">

          <Select
            value={this.state.newRecipientID}
            onChange={this.changeNewRecipient}
            options={options}
            className="select-new-message-recipient"
          />
          <Button className={"close-new-message"} onClick={closeNewMessage} close />

          <div className="conversation-messages">
          {this.renderConversationMessages(newMessageChats)}
          </div>
          <Input className={"input"} type="text" onChange={this.updateNewMessage} value={newMessage}/>
          <Button color="primary" disabled={newMessage === ''} onClick={this.sendNewMessage}>
            <i className="send-message fas fa-paper-plane"></i>
            Send
          </Button>
        </div>
      );
    }
    return (
      <div className="conversation">
        <div className="conversation-header">{activeName}</div>
        <div className="conversation-messages">
          {chats[active] ? this.renderConversationMessages(chats[active]) : null}
        </div>
        <Input className={"input"} type="text" onChange={this.updateNewMessage} value={newMessage}/>
        <Button color="primary" disabled={newMessage === ''} onClick={this.sendNewMessage}>
          <i className="send-message fas fa-paper-plane"></i>
          Send
        </Button>
      </div>
    );
  }
}

export default Sub_conversation;
