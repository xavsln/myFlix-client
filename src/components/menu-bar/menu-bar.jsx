import React from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
// import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';

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
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/">MyFlix</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home |</Nav.Link>
              {/* <Nav.Link href="/profile">Profile</Nav.Link> */}

              {/* {isloggedin() && (
                <Nav.Link href={`/users/${user}`}>
                  My favorite movies |
                </Nav.Link>
              )} */}

              {/* {isloggedin() && (
                <Nav.Link onClick={onLoggedOut} href="/">
                  Logout
                </Nav.Link>
              )} */}

              {!isloggedin() && <Nav.Link href="/">Login |</Nav.Link>}
              {!isloggedin() && <Nav.Link href="/register">Sign-up</Nav.Link>}

              {isloggedin() && (
                <NavDropdown title={user} id="user-nav-dropdown">
                  {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}

                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>



                <NavDropdown.Divider />

                {/* Logout navigation link */}

                  <NavDropdown.Item onClick={onLoggedOut} href="/">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
