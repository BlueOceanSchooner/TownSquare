import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
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
// import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
  }


  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleCreateGroup(e) {
    this.toggleModal();
    e.preventDefault();
  }

  render() {
    return (
      <div className="main-header">
        <Navbar  className="py-3" color="primary" expand='md'>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Create New Group</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleCreateGroup}>
                <FormGroup>
                  <Label for='group-name'>Group Name</Label>
                  <Input
                    type='text'
                    id='group-name'
                    name='group-name'
                    innerRef={(input) => (this.username = input)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Group Description</Label>
                  <Input
                    type='textarea'
                    id='group-description'
                    name='group-description'
                    innerRef={(input) => (this.password = input)}
                  />
                </FormGroup>
                <FormGroup>
                <Label for="modal-category">Select Category</Label>
                  <Input type="select" name="select" id="modal-category">
                    <option>outdoors</option>
                    <option>music</option>
                    <option>cooking</option>
                    <option>animal</option>
                    <option>hobbies</option>
                    <option>religious</option>
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
              style={{ color: '#fff', transform: "translateX(-50%)",
              left: "50%",
              position: "absolute",
              bottom: "10%",
              fontSize: "2em" }}
              href="/">
              &#91;&#160;&#160;&#93; TownSquare
              </NavbarBrand>
              </NavItem>
            </Nav>
          <div className="ml-auto">
            <Nav navbar>
              <NavItem>
                <Button
                  outline
                  color="secondary"
                  size="small"
                  style={{ backgroundColor: '#fff'}}
                  // onClick={this.toggleModal}
                  href="/allgroups">
                  Browse All Groups
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  outline
                  color="secondary"
                  size="small"
                  style={{ backgroundColor: '#fff', marginLeft: "10px"}}
                  onClick={this.toggleModal}
                  className="createGroupBtn"
                >
                  Create New Group
                </Button>
              </NavItem>
              <NavItem >
              <NavLink href="/">
                  <i style={{color: "#fff"}} className="fas fa-home fa-3x"></i>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;