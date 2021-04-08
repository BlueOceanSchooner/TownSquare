import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import Sub_previews from './Sub_previews.jsx';
import Sub_conversation from './Sub_conversation.jsx';

var userID = 0;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      chats: {},
      chatIDsOrderedByTime: [],
      active: 0,
      allUsers: [],
      newRecipient: false,
      newRecipientChanged: false,
      newRecipientID: null,
      newMessageViaNameClickClose: false,
      newMessageChats: [],
      newMessage: ''
    }
    this.getMessages = this.getMessages.bind(this);
    this.changeActiveConversation = this.changeActiveConversation.bind(this);
    this.changeActiveConversationAfterNewMessage = this.changeActiveConversationAfterNewMessage.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.openNewMessage = this.openNewMessage.bind(this);
    this.closeNewMessage = this.closeNewMessage.bind(this);
    this.getProperTimestamp = this.getProperTimestamp.bind(this);
    this.changeNewRecipient = this.changeNewRecipient.bind(this);
    this.updateNewMessage = this.updateNewMessage.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidMount() {
    this.getMessages(() => {
      this.setState({ disabled: false })
    });
    setInterval(this.getMessages, 5000);
    this.getAllUsers();
  }

  scrollDown() {
    var messageBody = document.querySelector('.chat-modal .modal-body .conversation-messages');
    if (messageBody) {
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  componentDidUpdate(props) {
    if (!props.modal && this.props.modal) {
      if (this.state.chatIDsOrderedByTime[0]) {
        this.setState({ active: this.state.chatIDsOrderedByTime[0] });
        this.markConversationAsRead(this.state.chatIDsOrderedByTime[0]);
      }
    } else if (props.modal && !this.props.modal) {
      this.setState({ active: 0 });
    }
    if (Number(this.props.userID) !== Number(userID)) {
      this.setState({
        chats: {},
        chatIDsOrderedByTime: [],
        active: 0,
        allUsers: [],
        newRecipient: false,
        newRecipientChanged: false,
        newRecipientID: null,
        newMessageViaNameClickClose: false,
        newMessageChats: [],
        newMessage: ''
      });
      userID = this.props.userID;
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.modal) {
      return {
        newMessageViaNameClickClose: false,
        newRecipient: false,
        newRecipientChanged: false,
        newRecipientID: null,
        newMessageChats: [],
        newMessage: ''
      };
    }
    return null;
  }

  getMessages(callback) {
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
          if (Number(chat[0].sender.user_id) === Number(this.props.userID)) {
            return chat[0].receiver.user_id;
          }
          return chat[0].sender.user_id;
        });

        var oldChats = this.state.chats;
        if (this.state.active) {
          this.setState({ chatIDsOrderedByTime: chatIDs, chats: response.data })
        } else {
          this.setState({ chatIDsOrderedByTime: chatIDs, chats: response.data, active: chatIDs[0] })
        }
        if (JSON.stringify(oldChats[this.state.active]) !== JSON.stringify(this.state.chats[this.state.active])) {
          this.markConversationAsRead(this.state.active);
        }
      }
    })
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch(err => console.log('error:', err));
  }

  markConversationAsRead(otherUserID) {
    if (this.state.chats[otherUserID]) {
      var unreadIDs = this.state.chats[otherUserID].filter(message => message.receiver.user_id === this.props.userID && message.read === 0).map(message => message.dm_id);
      if (unreadIDs.length) {
        axios.put('/api/dms', {
          DMs: unreadIDs
        })
        .then(() => {
          this.getMessages();
        })
      }
    }
  }

  changeActiveConversation(e) {
    var active = e.currentTarget.getAttribute('name');
    this.setState({ active });
    this.markConversationAsRead(active);
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
    this.setState({ newRecipient: false, newMessageViaNameClickClose: true, newRecipientID: null, newMessageChats: [], newMessage: '', newRecipientChanged: false });
  }

  getProperTimestamp(timestamp) {
    if (new Date().toDateString().slice(4,15) === new Date(timestamp).toDateString().slice(4,15)) {
      if (new Date(timestamp).getHours() > 12) {
        return `${new Date(timestamp).getHours() - 12}:${new Date(timestamp).getMinutes() < 10 ? '0' : ''}${new Date(timestamp).getMinutes()} PM`;
      }
      if (new Date(timestamp).getHours() === 12) {
        return `12:${new Date(timestamp).getMinutes() < 10 ? '0' : ''}${new Date(timestamp).getMinutes()} PM`;
      }
      return `${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes() < 10 ? '0' : ''}${new Date(timestamp).getMinutes()} AM`;
    }
    return new Date(timestamp).toDateString().slice(4,10);
  }

  sendNewMessage() {
    var memberNameClick = Boolean(this.props.chatMemberID) && !this.state.newMessageViaNameClickClose;

    if (this.state.newRecipient && !this.state.newRecipientID && !memberNameClick) {
      return alert("Please enter a valid recipient name");
    }

    if (memberNameClick) {
      var receiver_id = this.props.chatMemberID;
    } else if (this.state.newRecipient) {
      var receiver_id = this.state.newRecipientID.value;
    } else {
      var receiver_id = this.state.active;
    }

    axios.post('/api/dms', {
      sender_id: this.props.userID,
      receiver_id,
      message: this.state.newMessage
    })
    .then(() => {
      this.getMessages();
      if (this.state.newRecipient || memberNameClick) {
        this.changeActiveConversationAfterNewMessage(receiver_id);
        this.closeNewMessage();
      }
      this.setState({ newMessage: '', newRecipientID: null, newMessageChats: [] });
    })
    .then(() => {
      setTimeout(this.scrollDown, 100);
    })
    .catch(err => console.log('error:', err));
  }

  changeNewRecipient(e) {
    this.setState({ newRecipientID: e, newRecipientChanged: true });
    if (this.state.chats[e.value]) {
      this.setState({ newMessageChats: this.state.chats[e.value] });
    } else {
      this.setState({ newMessageChats: [] });
    }
  }

  updateNewMessage(e) {
    this.setState({ newMessage: e.target.value });
  }

  render() {
    if (Boolean(this.props.chatMemberID) && !this.state.newMessageViaNameClickClose) {
      var activeID = this.props.chatMemberID;
      var newRecipient = true;
    } else {
      var activeID = this.state.active;
      var newRecipient = this.state.newRecipient;
    }

    if (this.state.chats[activeID]) {
      if (this.state.chats[activeID][0].sender.user_id === this.props.userID) {
        var activeName = `${this.state.chats[activeID][0].receiver.first_name} ${this.state.chats[activeID][0].receiver.last_name}`;
      } else {
        var activeName = `${this.state.chats[activeID][0].sender.first_name} ${this.state.chats[activeID][0].sender.last_name}`;
      }
    } else {
        var activeName = null;
    }

    var { onClick } = this.props;

    if (Object.keys(this.state.chats).length) {
      var newMessageCount = Object.keys(this.state.chats).reduce((newMessageCount, otherUserID) => {
        return newMessageCount + this.state.chats[otherUserID].filter(chat => {
          return (!this.props.modal || Number(this.state.active) !== Number(chat.sender.user_id)) && Number(chat.receiver.user_id) === Number(this.props.userID) && Number(chat.read) === 0;
        }).length;
      }, 0);
    } else {
      var newMessageCount = null;
    }

    return (
      <div className="chat-icon">
         <i className="fas fa-comment-alt" style={this.state.disabled ? {display: "none"} : {display: "inline-block"}} onClick={onClick}></i>
         <div style={newMessageCount ? {display: "block"} : {display: "none"}} className="new-messages">
          {newMessageCount}
        </div>
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
              modal={this.props.modal}
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
              scrollDown={this.scrollDown}
            />

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
