import React from 'react';
import { Container, Row, Col, Card, Form, Button, Link } from 'react-bootstrap';

export function UserUpdate() {
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
                  value=""
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                {/* code added here to display validation error */}
                {/* {usernameErr && <p>{usernameErr}</p>} */}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: (minimum 8 characters)</Form.Label>
                <Form.Control
                  type="password"
                  value=""
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  minLength="8"
                />
                {/* code added here to display validation error */}
                {/* {passwordErr && <p>{passwordErr}</p>} */}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                {/* code added here to display validation error */}
                {/* {emailErr && <p>{emailErr}</p>} */}
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  // value={birthday}
                  // onChange={(e) => setBirthday(e.target.value)}
                  placeholder="Birthday"
                />
              </Form.Group>

              <Form.Group className="text-center" style={{ margin: '1rem' }}>
                <Button
                  type="submit"
                  // onClick={handleSubmit}
                  style={{ margin: '1rem' }}
                >
                  Submit
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
