import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
  console.log(props);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 4) {
      setPasswordErr('Password must be 4 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    console.log(username);
    console.log(typeof username);
    console.log(password);
    console.log(typeof password);
    e.preventDefault();

    const isReq = validate();
    if (isReq) {
      axios
        .post(
          'https://themyflixapp.herokuapp.com/login?Username=' +
            username +
            '&Password=' +
            password
          // {
          //   Username: username,
          //   Password: password,
          // }
        )
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
          console.log('sucessfull login');
        })
        .catch((e) => {
          // console.log('no such user ' + username + ' in the DB');
          alert('no such user: ' + username + ' in the DB');
          console.log(username);
          console.log(password);
        });
    }
  };

  return (
    <Container>
      <Row className="align-items-center" height="100vh">
        <Col>
          <Card style={{ width: '30rem', margin: '5rem auto' }}>
            <Card.Header className="text-center font-weight-bold">
              <h2>Login</h2>
            </Card.Header>
            <Form style={{ width: '80%', margin: '1rem auto' }}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: (minimum 4 characters)</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  // minLength="8"
                />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Form.Group className="text-center" style={{ margin: '1rem' }}>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  style={{ margin: '1rem' }}
                >
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  style={{ margin: '1rem' }}
                >
                  Register
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
