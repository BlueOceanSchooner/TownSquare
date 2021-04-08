import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LoginForm from './LoginForm.jsx';

const LoginModal = ({isLoginOpen, toggleLogin}) => {
  return (
    <div>
      <Modal isOpen={isLoginOpen} centered={true} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>
        Login
        <FormText>Not registered? <a href="/signup">Sign up</a></FormText>
        </ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
