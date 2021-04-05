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
  Input,
  Label,
  NavLink
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
      options: ['outdoors', 'music', 'cooking', 'animals', 'hobbies', 'religious']
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

  handleCreateGroup(e) {
    this.toggleModal();
    console.log(this.state.input);
    e.preventDefault();
  }

  handleChange(e) {
    let newInput = this.state.input;
    newInput[e.target.name] = e.target.value;
    this.setState({
      input: newInput
    });
  }

  render() {
    return (
      <div className='main-header'>
        <Router>
          <Navbar  className='py-3' color='primary' expand='md'>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Create New Group</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleCreateGroup}>
                  <FormGroup>
                    <Label for='group-name'>Group Name</Label>
                    <Input
                      type='text'
                      id='group-name'
                      name='name'
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='group-description'>Group Description</Label>
                    <Input
                      type='textarea'
                      id='group-description'
                      name='description'
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for='modal-category'>Select Category</Label>
                    <Input onChange={this.handleChange} type='select' name='category' id='modal-category'>
                      {this.state.options.map((option, i) => {
                        return <option key={i}>{option}</option>
                      })}
                    </Input>
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
        </Router>
      </div>
    );
  }
}

export default Header;