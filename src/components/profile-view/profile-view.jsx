import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { UserInfo } from './user-info';

import { Container, Row, Col, Card } from 'react-bootstrap';

export function ProfileView(props) {
  const currentUser = localStorage.getItem('user');
  console.log('Current user:', currentUser);

  const accessToken = localStorage.getItem('token');
  console.log('AccessToken: ', accessToken);

  const [user, setUser] = useState(currentUser);
  // const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getUser = () => {
    axios
      .get(`https://themyflixapp.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Your Profile information:</h4>
              </Card.Title>
              <p>Name: {user.Username}</p>
              <p>Email: {user.Email}</p>
              <p>Birthday: {user.Birthday}</p>
              <p>Favorite Movies: {favoriteMovies}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Profile update:</h4>
              </Card.Title>
              <UserInfo />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Favorite movies</h4>
    </Container>
  );
}
