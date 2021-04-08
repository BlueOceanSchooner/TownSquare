import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import LoginForm from './LoginForm.jsx';

const LoginPage= ({isLoginOpen, toggleLogin}) => {
  return (
    <Container style={{width: 500}}>
    <br />
    <br />
    <h3>Please log in to see more!</h3>
    <br />
    <LoginForm />


    </Container>
  );
};

export default LoginPage;
