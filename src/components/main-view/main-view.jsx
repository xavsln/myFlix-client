import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { readMoviesList } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MenuBar } from '../menu-bar/menu-bar';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { Container, Row, Col, Button } from 'react-bootstrap';

class MainView extends React.Component {
  constructor() {
    super();
    // Initialize MainView component's state (ie. components data)
    this.state = {
      // movies: [],
      user: null,
    };
  }

  componentDidMount() {
    // Store the token in the browser to allow authentication from the Client side
    let accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);

    // We update the user variable stored into the state of the MainView component
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    // localStorage.setItem('user', authData.user);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('role', authData.user.Role);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);

    this.getMovies(authData.token);
  }

  getMovies(token) {
    console.log('getMovies function successfully tiggered.');

    // We use axios library to fetch data from our API
    axios
      .get('https://themyflixapp.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        // this.setState({
        //   movies: response.data,
        // });
        this.props.readMoviesList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // const { movies, user, role } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <MenuBar user={user} />

        <Container>
          {/* <Row className="main-view justify-content-md-center mb-3">
            <Col xl={12}>
              <VisibilityFilterInput />
            </Col>
          </Row> */}

          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <>
                    <Col xl={12} className="mb-3">
                      <VisibilityFilterInput />
                    </Col>
                    <MoviesList movies={movies} />;
                  </>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      {alert('You need to be logged in to see this page')}
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0)
                  return <div className="main-view"></div>;

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      history={history}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      {alert('You need to be logged in to see this page')}
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0)
                  return <div className="main-view"></div>;

                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return <RegistrationView />;
              }}
            />

            <Route
              path="/profile"
              render={() => {
                return <ProfileView user={user} role={role} movies={movies} />;
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { readMoviesList })(MainView);
