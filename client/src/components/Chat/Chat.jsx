import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


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
    return (
      <div className="chat-icon">
        <i className="fas fa-comment-alt" onClick={this.openDMs}></i>
        <Modal isOpen={this.state.modal} toggle={this.openDMs} className={"chat-modal"}>
          <ModalHeader className={"modal-header"} toggle={this.openDMs}>Messages</ModalHeader>
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
                        {conversation[0].sender.user_id === this.props.userID ? `${conversation[0].receiver.first_name} ${conversation[0].receiver.last_name}` : `${conversation[0].sender.first_name} ${conversation[0].sender.first_name}`}
                      </span>
                      <br/>
                      <span className="last-message">
                        {conversation[conversation.length - 1].sender.user_id === this.props.userID ? 'You: ' : `${conversation[conversation.length - 1].sender.first_name}: `}
                        {conversation[conversation.length - 1].message}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default Chat;
