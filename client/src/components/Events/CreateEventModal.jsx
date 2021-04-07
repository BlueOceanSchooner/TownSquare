import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExploreGroups from '../ExploreGroups/ExploreGroups.jsx';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';


const CreateEventModal = (props) => {


    const [value, onChange] = useState(new Date());
    const [inputs, setInputs] = useState({});

    const onInputChange = (e) => {
      e.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const onSubmit = (e) => {
      e.preventDefault();
      console.log(inputs, value.toISOString());
      setInputs(inputs => ({}))
      props.toggleModal();
    }

    return (
      <div>
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
              <ModalHeader toggle={props.toggleModal}>Create Event</ModalHeader>
              <ModalBody>
              <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for='title'>Event Name</Label>
                    <Input
                      type='text'
                      id='title'
                      name='title'
                      value={inputs.title || ''}
                      onChange={onInputChange}
                      // onChange={this.handleChange}
                      // valid={this.state.validations.group_name && !this.state.nameTaken ? true : false}
                      // invalid={(this.state.nameTaken && !this.state.validations.group_name) ? true : false}
                    />
                    <FormText>e.g. Bake Sale</FormText>
                    <FormFeedback valid>Looks good!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='description'>Event Description</Label>
                    <Input
                      type='textarea'
                      id='event-description'
                      name='description'
                      value={inputs.description || ''}
                      onChange={onInputChange}
                      // onChange={this.handleChange}
                      // valid={this.state.validations.description}
                    />
                    <FormText>Please provide a description of the event.</FormText>
                    <FormFeedback valid>Great description!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='address_1'>Address 1</Label>
                    <Input
                      type='text'
                      id='address_1'
                      name='address_1'
                      value={inputs.address_1 || ''}
                      onChange={onInputChange}
                      // onChange={this.handleChange}
                      // valid={this.state.validations.description}
                    />
                    <FormText>e.g. 123 Fake Street</FormText>
                    {/* <FormFeedback valid>Great description!</FormFeedback> */}
                  </FormGroup>
                  <FormGroup>
                    <Label for='address_2'>Address 2</Label>
                    <Input
                      type='text'
                      id='address_2'
                      name='address_2'
                      value={inputs.address_2 || ''}
                      onChange={onInputChange}
                      // onChange={this.handleChange}
                      // valid={this.state.validations.description}
                    />
                    <FormText>e.g. Apartment 2</FormText>
                    {/* <FormFeedback valid>Great description!</FormFeedback> */}
                  </FormGroup>
                  <FormGroup>
                    <Label for='address_2'>Date and Time</Label>
                    <DateTimePicker value={value} onChange={onChange} />
                    {/* <FormFeedback valid>Great description!</FormFeedback> */}
                  </FormGroup>

                  <Button type='submit' value='submit' color='primary'>
                    Create Event
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
      </div>
    )

}

export default CreateEventModal;