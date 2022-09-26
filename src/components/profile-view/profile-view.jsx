import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import axios from 'axios';

// import { UserInfo } from './user-info';
import { UserUpdate } from './user-update';

import { Container, Row, Col, Card, Figure, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export function ProfileView(props) {
  // console.log('Props from ProfileView: ', props);

  const movies = props.movies;

  const currentUser = localStorage.getItem('user');

  const accessToken = localStorage.getItem('token');

  // Declare user as a stateful value
  const [user, setUser] = useState('');

  // Declare favoriteMovies as a stateful value
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // getUser function will fetch data from the API
  // user state and favoriteMovies state will be set

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

      // Reload the page to see the updated list of favorite movies
      window.location.reload(false);
    } else {
      alert('Movie not deleted from the list.');
    }
  };

  const onDeregister = (user_id) => {
    console.log(user_id);
    // Confirmation box
    let confirmActionMessage = confirm(
      'Are you sure you want to deregister from myFlix?'
    );
    if (confirmActionMessage) {
      axios.delete(`https://themyflixapp.herokuapp.com/users/${user_id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('User removed');
      alert('User deleted from the list.');

      // Remove the saved used data from browser storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('birthday');
      localStorage.removeItem('userData');

      // Update state to show the initial view after User logged out
      this.setState({
        user: null,
      });
    } else {
      alert('User not deleted from the list.');
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
              <Button
                variant="danger"
                onClick={() => {
                  onDeregister(user._id);
                }}
                href="/"
              >
                Deregister
              </Button>
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
                    <Col
                      xs={12}
                      md={6}
                      lg={3}
                      className="fav-movie"
                      key={movie._id}
                    >
                      <Figure>
                        <Link to={`movies/${movie._id}`}>
                          <Figure.Image
                            width={171}
                            height={180}
                            alt={movie.Title}
                            src={movie.ImagePath}
                            crossOrigin="anonymous"
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

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        // Birth: PropTypes.instanceOf(Date).isRequired,
        // Death: PropTypes.instanceOf(Date).isRequired,
      }),
      ImagePath: PropTypes.string.isRequired,
      // Rating: PropTypes.number.isRequired,
      Featured: PropTypes.bool.isRequired,
    })
  ).isRequired,
  // user: PropTypes.string.isRequired,
};
