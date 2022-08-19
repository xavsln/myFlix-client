import React, { useState } from "react";
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
        
          <Row className="align-items-center" height="100vh">
            <Col>
              <Card style={{ width: '30rem', margin: '5rem auto' }}>
              <Card.Header className="text-center font-weight-bold"><h2>Login</h2></Card.Header>
                <Form style={{width: '80%', margin: '1rem auto'}}>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)}  placeholder="Enter Username" required />
                  </Form.Group>
                
                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" minLength="8" required />
                  </Form.Group>
                  
                  <Form.Group className="text-center" style={{ margin: '1rem'}}>
                    <Button type="submit" onClick={handleSubmit} style={{ margin: '1rem'}} >Submit</Button>
                    <Button variant="secondary" type="button" style={{ margin: '1rem'}}>Register</Button>
                  </Form.Group>

                </Form>
              </Card>
            </Col>
          </Row>

    </Container>

  );

  }

  LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  }; 
