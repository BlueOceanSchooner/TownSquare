import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="chat-icon">
        <i className="fas fa-comment-alt" onClick={this.onClick}></i>
        <Modal isOpen={this.state.modal} toggle={this.onClick}>
          <ModalHeader toggle={this.onClick}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
