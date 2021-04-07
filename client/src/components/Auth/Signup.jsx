import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Signup = () => {
  const [queries, setQueries] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [inputValid, setInputValid] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false
  });
  const [showError, setShowError] = useState(false)

  const handleChange = e => {
    setQueries({ ...queries, [e.target.name]: e.target.value })
    if (e.target.name === 'first_name' || e.target.name === 'last_name') {
      setInputValid({ ...inputValid, [e.target.name]: e.target.value !== ''})
    }
    else if (e.target.name === 'password') {
      setInputValid({ ...inputValid, password: e.target.value.length >= 6})
    }
    else if (e.target.name === 'email') {
      setInputValid({ ...inputValid, email: checkEmail(e.target.value)})
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (Object.values(inputValid).every(item => item === true) ) {
      axios.post('/signup', queries)
    } else {
      setShowError(true);
    }
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
  const checkPassword = password => {
    if (password.length < 8) { return false;}
  }

  return (
    <div>
      <Container style={{width: 500}}>
        <br />
        <br />
        <h2>Sign up</h2>
        <br />
          <Form>
            <FormGroup>
              <Label for="first_name">First Name*:</Label>
              <Input type="text" name="first_name" value={queries.first_name} onChange={handleChange}/>
              { showError && !inputValid.first_name && <FormText color="danger">Please enter a valid first name.</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name*:</Label>
              <Input type="text" name="last_name" value={queries.last_name} onChange={handleChange}/>
              { showError && !inputValid.last_name && <FormText color="danger">Please enter a valid last name.</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address*:</Label>
              <Input type="email" name="email" value={queries.email} onChange={handleChange}/>
              { showError && !inputValid.email && <FormText color="danger">Please enter a valid email address.</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password*:</Label>
              <Input name="password" type="password" value={queries.password} onChange={handleChange}/>
              { showError && !inputValid.password && <FormText color="danger">The password must be at least 6 characters long.</FormText>}
            </FormGroup>
          </Form>
          <br />
          <Button color="primary" onClick={handleSubmit}>Sign up</Button>
          <br />
          <br />
          <br />
          <div className="g-signin2" data-width="470" data-height="50" data-longtitle="true" data-theme="dark"></div>
      </Container>
    </div>
  );
};

export default Signup;
