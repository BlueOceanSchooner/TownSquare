import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  Label,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ExploreGroups from '../ExploreGroups/ExploreGroups.jsx';
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      input: {
        group_name: '',
        description: '',
        category: ''
      },
      options: ['', 'outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious'],
      validations: {
        group_name: false,
        description: false,
        category: false
      }
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  allValid() {
    let valid = true;
    for (let key in this.state.validations) {
      if (!this.state.validations[key]) {
        valid = false;
      }
    }
    return valid;
  }

  handleCreateGroup(e) {
    e.preventDefault();
    if (this.allValid()) {
      this.toggleModal();
      let data = this.state.input;
      data.owner_id = this.props.userID;
      axios.post('/api/groups', data)
        .catch((err) => console.log(err))
        .then(() => {
          this.setState({
            input: {
              group_name: '',
              description: '',
              category: ''
            },
            validations: {
              group_name: false,
              description: false,
              category: false
            }
          })
        })

    }
  }

  handleChange(e) {
    let newInput = this.state.input;
    newInput[e.target.name] = e.target.value;

    let newValid = this.state.validations;
    if (e.target.value.length > 5 && e.target.name === 'group_name') {
      newValid[e.target.name] = true;
    } else if ((e.target.value.length < 5 && e.target.name === 'group_name')) {
      newValid[e.target.name] = false;
    }
    if (e.target.value.length > 10 && e.target.name === 'description') {
      newValid[e.target.name] = true;
    } else if (e.target.value.length < 10 && e.target.name === 'description'){
      newValid[e.target.name] = false;
    }
    if (e.target.value !== '' && e.target.name === 'category') {
      newValid[e.target.name] = true;
    } else if (e.target.value === '' && e.target.name === 'category') {
      newValid[e.target.name] = false;
    }
    this.setState({
      input: newInput,
      validations: newValid
    });
  }

  render() {
    return (
      <div className='main-header'>
          <Navbar  className='py-3' color='primary' expand='md'>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Create New Group</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleCreateGroup}>
                  <FormGroup>
                    <Label for='group_name'>Group Name</Label>
                    <Input
                      type='text'
                      id='group_name'
                      name='group_name'
                      onChange={this.handleChange}
                      valid={this.state.validations.group_name}
                    />
                    <FormText>e.g. Philly Phanatics</FormText>
                    <FormFeedback valid>Sweet! That name is available!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='group-description'>Group Description</Label>
                    <Input
                      type='textarea'
                      id='group-description'
                      name='description'
                      onChange={this.handleChange}
                      valid={this.state.validations.description}
                    />
                    <FormText>Please provide a description of your group.</FormText>
                    <FormFeedback valid>Great description!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                  <Label for='modal-category'>Select Category</Label>
                    <Input
                    onChange={this.handleChange}
                    type='select'
                    name='category'
                    id='modal-category'
                    valid={this.state.validations.category}
                    >
                      {this.state.options.map((option, i) => {
                        return <option value={option} key={i}>{option}</option>
                      })}
                    </Input>
                    <FormText>Select a category for your group.</FormText>
                    <FormFeedback valid></FormFeedback>
                </FormGroup>
                  <Button type='submit' value='submit' color='primary'>
                    Create Group
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
              <Nav navbar>
                <NavItem>
                  <NavbarBrand
                  className='mx-auto'
                  style={{ color: '#fff', transform: 'translateX(-50%)',
                  left: '50%',
                  position: 'absolute',
                  bottom: '15%',
                  fontSize: '2em' }}
                  href='/'
                  >
                  &#91;&#160;&#160;&#93; TownSquare
                  </NavbarBrand>
                </NavItem>
              </Nav>
            <div className='ml-auto'>
              <Nav navbar>
                <NavItem>
                  <Link to='/allgroups'>
                    <Button
                      outline
                      color='secondary'
                      size='small'
                      style={{ backgroundColor: '#fff', marginTop: '16px'}}
                      >
                      Browse All Groups
                    </Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Button
                    outline
                    color='secondary'
                    size='small'
                    style={{ backgroundColor: '#fff', marginLeft: '10px', marginTop: '16px'}}
                    onClick={this.toggleModal}
                    className='createGroupBtn'
                  >
                    Create New Group
                  </Button>
                </NavItem>
                <NavItem >
                <Link to='/'>
                    <i style={{color: '#fff', marginLeft: '10px', marginTop: '9px'}} className='fas fa-home fa-3x'></i>
                  </Link>
                </NavItem>
              </Nav>
            </div>
          </Navbar>
      </div>
    );
  }
}

export default Header;

