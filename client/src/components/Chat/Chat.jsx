import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chats: {
        "2": [
          {
            "dm_id": 2,
            "timestamp": "2021-04-05T16:28:09.000Z",
            "message": "Hi",
            "sender": {
              "user_id": 1,
              "first_name": "Stephen",
              "last_name": "Hyde"
            },
            "receiver": {
              "user_id": 2,
              "first_name": "Fred",
              "last_name": "Flintstone"
            }
          },
          {
            "dm_id": 4,
            "timestamp": "2021-04-05T16:28:42.000Z",
            "message": "May we have a conversation?",
            "sender": {
              "user_id": 1,
              "first_name": "Stephen",
              "last_name": "Hyde"
            },
            "receiver": {
              "user_id": 2,
              "first_name": "Fred",
              "last_name": "Flintstone"
            }
          }
        ]
      }
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
    // if (!modal) {
    //   axios.get(`/api/users/${this.props.userID}/dms`)
    //   .then(response => this.setState({ chats: response }))
    //   .catch(err => console.log('error:', err));
    // }
  }

  render() {
    console.log()
    return (
      <div className="chat-icon">
        <i className="fas fa-comment-alt" onClick={this.onClick}></i>
        <Modal isOpen={this.state.modal} toggle={this.onClick} className={"chat-modal"}>
          <ModalHeader>Messages</ModalHeader>
          <ModalBody toggle={this.onClick}>
            {Object.keys(this.state.chats).map(otherUserID => {
              let conversation = this.state.chats[otherUserID];
              return (
                <>
                <div>{conversation[0] ? conversation[0].sender.first_name : null}</div>
                <div>{conversation[0] ? conversation[0].message : null}</div>
                </>
              )
            })}

            {/* <table>
              <thead>
                <tr>
                  <th>
                    Messages
                  </th>
                  <th>
                    Sam Smith
                  </th>
                </tr>
              </thead>
            </table> */}
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
