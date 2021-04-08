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
      let data = inputs;
      data.event_date = value.toISOString().slice(0, 19);
      props.group.group_id = props.group.group_id.toString();
      data.group_id = props.group.group_id;
      axios.post('/api/events', data)
        .then((res) => {
          // console.clear()
          location.reload()
          setInputs(inputs => ({}))
          props.toggleModal();
        })
    }

    return (
      <div>
        <Modal className='create-event-modal modal-dialog'  isOpen={props.isModalOpen} toggle={props.toggleModal}>
              <ModalHeader toggle={props.toggleModal}>Create Event</ModalHeader>
              <ModalBody className='create-event-modal-body'>
              <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for='title'>Event Name</Label>
                    <Input
                      type='text'
                      id='title'
                      name='title'
                      value={inputs.title || ''}
                      onChange={onInputChange}
                      required
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
                      required
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
                      required
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
                    />
                    <FormText>e.g. Apartment 2</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for='city'>City</Label>
                    <Input
                      type='text'
                      id='city'
                      name='city'
                      value={inputs.city || ''}
                      onChange={onInputChange}
                      required
                    />
                    <FormText>e.g. Springfield</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for='city'>State</Label>
                    <Input
                      type='text'
                      id='state'
                      name='state'
                      value={inputs.state || ''}
                      onChange={onInputChange}
                      required
                    />
                    <FormText>e.g. Springfield</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for='zipcode'>Zipcode</Label>
                    <Input
                      type='text'
                      id='zipcode'
                      name='zipcode'
                      value={inputs.zipcode || ''}
                      onChange={onInputChange}
                      required
                    />
                    <FormText>e.g. 12345</FormText>
                  </FormGroup>
                  <FormGroup>
                    <div>Date and Time</div>
                    <DateTimePicker value={value} onChange={onChange} />
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