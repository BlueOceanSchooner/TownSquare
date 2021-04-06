import React from 'react';
import { Button, Modal, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Signup = () => {
  return (
    <div>
      <Container style={{width: 500}}>
        <h2>Sign up</h2>
          <Form>
            <FormGroup>
              <Label for="username">Username:</Label>
              <Input type="text" name="username"/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address:</Label>
              <Input type="email" name="email"/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input name="password" type="password" name="password"/>
            </FormGroup>
          </Form>
          <br />
          <Button color="primary" >Sign up</Button>{' '}
          <Button color="secondary" >Cancel</Button>
          <br />
          <br />
          <br />
          <div className="g-signin2" data-width="470" data-height="50" data-longtitle="true" data-theme="dark"></div>
      </Container>
    </div>
  );
};

export default Signup;
