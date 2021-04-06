import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Login = () => {
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} centered={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
        <h2>Login</h2>

        <FormText>Not registered? <a href="/signup">Sign up</a></FormText>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email Address:</Label>
              <Input type="email" name="email"/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input name="password" type="password" name="password"/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}Keep me signed in
              </Label>
            </FormGroup>
          </Form>
          <br />
          <Button color="success">Login</Button>&nbsp;&nbsp;
          <Button color="secondary">Cancel</Button>
        </ModalBody>

        <ModalFooter >
          <div style={{width: '100%'}}>
            <div className="g-signin2" data-width="200" data-height="50" data-longtitle="true" data-theme="dark"></div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
