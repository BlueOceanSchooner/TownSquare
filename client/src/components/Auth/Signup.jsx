import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Signup = () => {
  const [queries, setQueries] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setQueries({ ...queries, [e.target.name]: e.target.value })
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (checkEmail(queries.email) && queries.password !== '' && queries.first_name !== '' && queries.last_name !== '') {
      axios.post('/signup', queries)
    } else {
      alert('Wrong entries!')
    }
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
              <Label for="first_name">First Name:</Label>
              <Input type="text" name="first_name" value={queries.first_name} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name:</Label>
              <Input type="text" name="last_name" value={queries.last_name} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address:</Label>
              <Input type="email" name="email" value={queries.email} onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input name="password" type="password" value={queries.password} onChange={handleChange}/>
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
