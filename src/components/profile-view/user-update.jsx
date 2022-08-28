import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Container, Row, Col, Card, Form, Button, Link } from 'react-bootstrap';

export function UserUpdate(props) {
  const accessToken = localStorage.getItem('token');
  console.log('AccessToken: ', accessToken);

  console.log('From the UserUpdate function!');
  console.log(props);
  const [username, setUsername] = useState(props.user.Username);
  const [password, setPassword] = useState(props.user.Password);
  const [email, setEmail] = useState(props.user.Email);
  const [birthday, setBirthday] = useState(props.user.Birthday);

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    console.log('From validate function');

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
    } else if (password.length < 8) {
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is invalid');
      isReq = false;
    }

    return isReq;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // console.log(username, password, email, birthday);
    /* Send a request to the server */

    console.log('Test from button: ', accessToken);

    const isReq = validate();
    console.log('IsReq value: ', isReq);
    console.log('Updated email: ', email);

    if (isReq) {
      axios
        .put(
          `https://themyflixapp.herokuapp.com/users/${props.user._id}`,

          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          const data = response.data;

          console.log(data);
          alert('Update sucessfull, please login!');
          window.open('/', '_self');
        })
        .catch((response) => {
          console.error(response);
          alert('Unable to register!');
        });
    }
  };

  return (
    <Container>
      <Row className="align-items-center" height="100vh">
        <Col>
          <Card>
            <Card.Header className="text-center font-weight-bold">
              <h5>Update your infos here:</h5>
            </Card.Header>

            <Form style={{ width: '80%', margin: '1rem auto' }}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  // value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={props.user.Username}
                />
                {/* {console.log('Username from Form', { username })} */}
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: (minimum 8 characters)</Form.Label>
                <Form.Control
                  type="password"
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength="8"
                />
                {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={props.user.Email}
                />
                {/* code added here to display validation error */}
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  // value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  placeholder={props.user.Birthday}
                />
              </Form.Group>

              <Form.Group className="text-center" style={{ margin: '1rem' }}>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={handleUpdateProfile}
                  style={{ margin: '1rem' }}
                >
                  Update
                </Button>
                <p></p>
                {/* <p>
                  If already registered, <Link to={'/'}>Log-in</Link>
                </p> */}
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
