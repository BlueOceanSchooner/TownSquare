import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExploreGroups from '../ExploreGroups/ExploreGroups.jsx';
import axios from 'axios';



class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'Sister Wives Watch Party',
      isModalOpen: this.props.modalOpen


    }
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {

    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.eventName}</ModalHeader>
          <ModalBody>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default EventModal;