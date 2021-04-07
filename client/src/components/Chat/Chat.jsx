import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

import Sub_previews from './Sub_previews.jsx';
import Sub_conversation from './Sub_conversation.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: {},
      chatIDsOrderedByTime: [],
      active: 0,
      allUsers: [],
      newRecipient: false,
      newMessageViaNameClickClose: false
    }
    this.getMessages = this.getMessages.bind(this);
    this.changeActiveConversation = this.changeActiveConversation.bind(this);
    this.changeActiveConversationAfterNewMessage = this.changeActiveConversationAfterNewMessage.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.openNewMessage = this.openNewMessage.bind(this);
    this.closeNewMessage = this.closeNewMessage.bind(this);
    this.getProperTimestamp = this.getProperTimestamp.bind(this);
  }

  componentDidMount() {
    this.getMessages();
    setInterval(this.getMessages, 10000);
    this.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.modal) {
      this.setState({ newMessageViaNameClickClose: false, newRecipient: false })
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
    this.setState({ newRecipient: true, newMessageViaNameClickClose: false });
    this.getAllUsers();
  }

  closeNewMessage() {
    this.setState({ newRecipient: false, newMessageViaNameClickClose: true });
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


  render() {
    var memberNameClick = Boolean(this.props.chatMemberID);
    if (memberNameClick) {
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

    return (
      <div className="chat-icon">
         <i className="fas fa-comment-alt" onClick={onClick}></i>
        <Modal isOpen={this.props.modal} toggle={onClick} className={"chat-modal"}>
          <ModalHeader className={"modal-header"} toggle={onClick}>
            Messages
          </ModalHeader>
          <ModalBody className={"modal-body"}>

            <Sub_previews userID={this.props.userID} chats={this.state.chats} active={activeID} changeActiveConversation={this.changeActiveConversation} openNewMessage={this.openNewMessage} newRecipient={newRecipient && !this.state.newMessageViaNameClickClose} chatIDsOrderedByTime={this.state.chatIDsOrderedByTime} getProperTimestamp={this.getProperTimestamp} memberNameClick={memberNameClick}/>

            <Sub_conversation userID={this.props.userID} activeName={activeName} chats={this.state.chats} active={activeID} newRecipient={newRecipient && !this.state.newMessageViaNameClickClose} allUsers={this.state.allUsers} closeNewMessage={this.closeNewMessage} getMessages={this.getMessages} changeActiveConversationAfterNewMessage={this.changeActiveConversationAfterNewMessage} getProperTimestamp={this.getProperTimestamp} memberNameClick={memberNameClick}/>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Chat;
