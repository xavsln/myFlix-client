import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

export function MenuBar({ user }) {
  // check if user is logged in
  const isloggedin = () => {
    // We check if there is a token in our browser
    let accessToken = localStorage.getItem('token');

    if (typeof window == 'undefined') {
      return false;
    }

    if (accessToken) {
      console.log('User is logged in');
      return accessToken;
    } else {
      console.log('User is not logged in');
      return false;
    }
  };

  const onLoggedOut = () => {
    // Remove the saved used data from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('birthday');

    // Update state to show the initial view after User logged out
    this.setState({
      user: null,
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {isloggedin() && (
              <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isloggedin() && (
              <Nav.Link onClick={onLoggedOut} href="/">
                Logout
              </Nav.Link>
            )}
            {!isloggedin() && <Nav.Link href="#login">Login</Nav.Link>}
            {!isloggedin() && <Nav.Link href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
