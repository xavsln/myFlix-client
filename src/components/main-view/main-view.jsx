import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import {
  readMoviesList,
  readSelectedMovieInfo,
  readUserProfile,
} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MenuBar } from '../menu-bar/menu-bar';

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
    // State declaration - Initialize MainView component's state (ie. components data)
    this.state = {
      // movies: [],  // Removed as we do not want to use the local state anymore but the one from Redux Store instead
      // user: null, // Removed as we do not want to use the local state anymore but the one from Redux Store instead
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

        // We call readMoviesList action and pass the full movies list
        this.props.readMoviesList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // const { movies, user, role } = this.state;  // Unused now... was needed when state was stored in the component private store (vs. Redux store as below)

    console.log('movies state object extracted from the props: ', this.props);
    // The movies state is extracted from the store (via props) thanks to the connect function below that allows to put the state into props (hence accessible into this component)
    let { movies } = this.props.movies; // movies is extracted from this.props rather than from the this.state
    console.log('Movies after the props: ', movies);
    // let { selectedMovie } = this.props.selectedMovie;
    // console.log('SelectedMovie from the props Redux Store: ', selectedMovie);

    let { user } = this.state;

    let { role } = this.state;

    return (
      <Router>
        {/* MenuBar component with user **prop** (ie. variable) to be passed from parent component (ie. MainView) to MenuBar Child component */}
        <MenuBar user={user} />

        <Container>
          <Row className="main-view justify-content-md-center">
            {/* ================== */}
            {/* Root route */}
            {/* ================== */}

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

            {/* ======================================= */}
            {/* Read a specific Movie information route */}
            {/* ======================================= */}

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

                console.log('Show movies', movies);
                console.log(
                  'props access from the movies/:movieId: ',
                  this.props
                );

                // this.props.readSelectedMovieInfo(movie);
                let movie = movies.find((m) => m._id === match.params.movieId);

                console.log('Movie from movie :', movie);
                // pass the selected movie to the readSelectedMovieInfo action
                this.props.readSelectedMovieInfo(movie);

                return (
                  <Col md={8}>
                    {console.log(
                      'movie value before it is passed as prop in MovieView: ',
                      movie
                    )}
                    <MovieView
                      movie={movie}
                      // movie={movies.find((m) => m._id === match.params.movieId)}
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

            {/* =========================== */}
            {/* New User Registration route */}
            {/* =========================== */}

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return <RegistrationView />;
              }}
            />
            {/* ============================= */}
            {/* Read User profile information */}
            {/* ============================= */}
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

// mapStateToProps is a function that—if defined—will allow the component (the one we want to connect) to subscribe to store updates.
// Any time the store is updated, this function will be called.
let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    users: state.userReducer,
  };
};

// Allows to convert state (in this case our actions/functions) to props and make it available for use in designated components
// Thanks to that we will have access to readMoviesList and readSelectedMovieInfo functions (ie. actions) from the props
export default connect(mapStateToProps, {
  readMoviesList,
  readSelectedMovieInfo,
})(MainView);
