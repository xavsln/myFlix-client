import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';

import { Container, Row, Col, Card, Figure, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export function ProfileView(props) {
  console.log('Props from ProfileView: ', props);
  const movies = props.movies;
  console.log('List from props in Profile-View: ', movies);

  const currentUser = localStorage.getItem('user');
  console.log('Current user:', currentUser);

  const accessToken = localStorage.getItem('token');
  console.log('AccessToken: ', accessToken);

  const [user, setUser] = useState(currentUser);
  console.log('User assigned to state: ', user);

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getUser = () => {
    axios
      .get(`https://themyflixapp.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
        // console.log(favoriteMovies);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const removeFav = (m_id) => {
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to delete this movie from your favorite movie list?'
    );
    if (confirmActionMessage) {
      axios.delete(
        `https://themyflixapp.herokuapp.com/users/${currentUser}/movies/${m_id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log('Movie removed');
      alert('Movie successfully deleted from the list.');
    } else {
      alert('Movie not deleted from the list.');
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Your Profile information:</h4>
              </Card.Title>
              <p>Id: {user._id}</p>
              <p>Name: {user.Username}</p>
              <p>Email: {user.Email}</p>
              {user.Birthday && <p>Birthday: {user.Birthday.slice(0, 10)}</p>}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Profile update:</h4>
              </Card.Title>
              <UserUpdate user={user} />
              {/* <p>Name: {user.Username}</p> */}
              {console.log('User from the user state in update section', user)}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <h4>Favorite movies:</h4>
              </Card.Title>
              <Row>
                {favoriteMovies.map((movieId) => {
                  let movie = movies.find((m) => m._id === movieId);
                  return (
                    <>
                      <Col xs={12} md={6} lg={3} className="fav-movie">
                        <Figure>
                          {console.log('Movie object: ', movie._id)}
                          <Link to={`movies/${movie._id}`}>
                            <Figure.Image
                              width={171}
                              height={180}
                              alt={movie.Title}
                              src={movie.ImagePath}
                              // {console.log(imagePath)}
                              crossorigin="anonymous"
                            />
                            <Figure.Caption>{movie.Title}</Figure.Caption>
                          </Link>
                          <Button
                            variant="warning"
                            onClick={() => removeFav(movie._id)}
                          >
                            Remove from list
                          </Button>
                        </Figure>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
