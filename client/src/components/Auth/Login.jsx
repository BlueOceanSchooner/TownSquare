import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = ({isLoginOpen, toggleLogin}) => {
  const [queries, setQueries] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setQueries({ ...queries, [e.target.name]: e.target.value })
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkEmail(queries.email) && queries.password !== '') {
      axios.post('/login', queries)
    } else {
      alert('Wrong entries!')
    }
  }
  const checkEmail= (email) => {
    var [user, domain] = email.split('@');
    if (domain === undefined) { return false; }
    if (user === '') { return false; }
    var domainParts = domain.split('.');
    if (domainParts.length <= 1) { return false; }
    if (domainParts.includes('')) { return false; }
    return true;
  }
  return (
    <div>
      <Modal isOpen={isLoginOpen} centered={true} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
        Login

        <FormText>Not registered? <a href="/signup">Sign up</a></FormText>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email Address:</Label>
              <Input type="email" name="email" value={queries.email} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input name="password" type="password" value={queries.password} onChange={handleChange}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}Keep me signed in
              </Label>
            </FormGroup>
          </Form>
          <br />
          <Button color="success" onClick={handleSubmit}>Login</Button>
        </ModalBody>

        <ModalFooter >
          <div className="g-signin2" data-width="200" data-height="50" data-longtitle="true" data-theme="dark"></div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
