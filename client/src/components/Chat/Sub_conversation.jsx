import React from 'react';
import axios from 'axios';
import { Badge, Button, Input } from 'reactstrap';
import Select from 'react-select';

var active = 0;

class Sub_conversation extends React.Component {
  constructor(props) {
    super(props);
    this.enterToSend = this.enterToSend.bind(this);
  }

  componentDidUpdate(props) {
    if (Number(this.props.active) !== Number(active) || JSON.stringify(this.props.chats[this.props.active]) !== JSON.stringify(props.chats[this.props.active])) {
      this.props.scrollDown();
      active = this.props.active;
    }
  }

  renderConversationMessages(chats) {
    if (chats) {
      return chats.map(message => {
        return (
          <div key={message.dm_id} className={message.sender.user_id === this.props.userID ? "conversation-you" : "conversation-other"}>
          {message.sender.user_id === this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
          <div className="conversation-content">
            <span className="name">
              {`${message.sender.first_name} ${message.sender.last_name}`}
            </span>
            <span className="timestamp">
              {this.props.getProperTimestamp(message.timestamp)}
            </span>
            <span className="message-content">
              <div className={message.sender.user_id === this.props.userID ? "arrow right" : "arrow left"}></div>
              {message.message}
            </span>
          </div>
            {message.sender.user_id !== this.props.userID ? null : <i className="user-picture fas fa-user"></i>}
          </div>
        )
      });
    }
    return null;
  }

  enterToSend(e) {
    if (e.key === "Enter") {
      this.props.sendNewMessage();
    }
  }

  render() {
    const { userID, activeName, chats, active, newRecipient, newRecipientID, allUsers, closeNewMessage, memberNameClick, newMessage, newMessageChats, changeNewRecipient, updateNewMessage, sendNewMessage } = this.props;
    if (newRecipient) {
      const options = allUsers.filter(user => user.user_id !== userID).map(user => {
        return (
          { value: user.user_id, label: `${user.first_name} ${user.last_name}`}
        )
      });
      return (
        <div className="conversation">
          <Select
            value={memberNameClick ? options.filter(user => Number(user.value) === Number(active)) : newRecipientID}
            onChange={changeNewRecipient}
            options={options}
            className="select-new-message-recipient"
          />
          <Button className={"close-new-message"} onClick={closeNewMessage} close />

          <div className="conversation-messages">
          {memberNameClick ? this.renderConversationMessages(chats[active]) : this.renderConversationMessages(newMessageChats)}
          </div>

          <Input className={"input"} type="text" onChange={updateNewMessage} value={newMessage} onKeyPress={this.enterToSend}/>
          <Button style={{backgroundColor: "#344e64"}} disabled={newMessage === ''} onClick={sendNewMessage}>
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
        <Input className={"input"} type="text" onChange={updateNewMessage} value={newMessage} onKeyPress={this.enterToSend}/>
        <Button style={{backgroundColor: "#344e64"}} disabled={newMessage === ''} onClick={sendNewMessage}>
          <i className="send-message fas fa-paper-plane"></i>
          Send
        </Button>
      </div>
    );
  }
}

export default Sub_conversation;
