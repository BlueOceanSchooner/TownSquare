import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

const LoginForm = () => {
  const [queries, setQueries] = useState({
    email: '',
    password: '',
  });
  const [inputValid, setInputValid] = useState({
    email: false,
    password: false
  });
  const [keepLogin, setKeepLogin] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);

  const handleChange = e => {
    setQueries({ ...queries, [e.target.name]: e.target.value })
    setInputValid({ ...inputValid, [e.target.name]: e.target.value !== ''})
    setShowAuthError(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.values(inputValid).every(item => item === true)) {
      axios.post('/login', {...queries, keepLogin: keepLogin})
      .then(data => {
        console.log(data.data)
        if (data.data.msg === 'success') {
          window.location.href = '/';
        }
      })
      .catch(err => {
        setShowAuthError(true);
      })
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
  { showAuthError? <FormText color="danger">The email or password is incorrect. Please verify</FormText> : <br />}
  <br />
  <Button color="success" onClick={handleSubmit}>Login</Button>

    <br />
    <br />
  <div className="g-signin2" data-width="470" data-height="50" data-longtitle="true" data-theme="dark"></div>
  </Form>

  );
};

export default LoginForm;
