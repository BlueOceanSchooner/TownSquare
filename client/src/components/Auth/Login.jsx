import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = ({isLoginOpen, toggleLogin}) => {
  const [queries, setQueries] = useState({
    email: '',
    password: '',
  });
  const [keepLogin, setKeepLogin] = useState(false);
  const [inputValid, setInputValid] = useState({
    email: false,
    password: false
  });
  const [showError, setShowError] = useState(false);
  const handleChange = e => {
    setQueries({ ...queries, [e.target.name]: e.target.value })
    setInputValid({ ...inputValid, [e.target.name]: e.target.value !== ''})
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.values(inputValid).every(item => item === true)) {
      axios.post('/login', {...queries, keepLogin: keepLogin})
    } else {
      setShowError(true);
    }
  }

  const handleKeepLoginChange = e => {
    setKeepLogin(!keepLogin);
  }

  const checkEmail = email => {
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
              { showError && !inputValid.email && <FormText color="danger">Please enter a valid email address.</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input name="password" type="password" value={queries.password} onChange={handleChange}/>
              { showError && !inputValid.password && <FormText color="danger">Please enter the password.</FormText>}
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={handleKeepLoginChange}/>{' '}Keep me signed in
              </Label>
            </FormGroup>
          </Form>
          <br />
          <Button color="success" onClick={handleSubmit}>Login</Button>
        </ModalBody>

        <ModalFooter >
          <div className="g-signin2" data-width="470" data-height="50" data-longtitle="true" data-theme="dark"></div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
