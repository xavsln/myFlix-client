import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// import required actions
import { setMovies, setUser } from '../../actions/actions';

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
  }

  componentDidMount() {
    // The token is stored in the browser to allow authentication from the Client side
    // getItem method allows to retrieve its value (or null if it does not exist)
    let accessToken = localStorage.getItem('token');

    if (accessToken !== null) {
      // If User already connected, its state value will be the one from the browser local storage
      this.props.setUser({
        user: localStorage.getItem('user'),
      });

      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    console.log('getMovies function successfully tiggered.');

    // We use axios library to fetch data from our API
    axios
      .get('https://themyflixapp.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // We call setMovies action and pass the full movies list from the API. This will update the movies state in the Redux Store
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log('authData from MainView component: ', authData);

    // Call the setUser action. This will update the user state with the Username value

    this.props.setUser({
      user: authData.user.Username,
    });
    // location.reload();

    // When User logs in below data are stored into its browser
    // LocalStorage object allows to save key/value pairs in the browser
    localStorage.setItem('token', authData.token);

    // let dataForUser = JSON.stringify(authData.user);
    console.log('data for user:', authData.user);

    localStorage.setItem('userData', JSON.stringify(authData.user));

    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('role', authData.user.Role);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);

    // Will trigger the getMovies function to fetch movies from the API
    this.getMovies(authData.token);
  }

  render() {
    console.log('State object extracted from the props: ', this.props);

    // The movies state is extracted from the store (via props) thanks to the connect function below that allows to put the state into props (hence accessible into other component)
    let { movies, user } = this.props; // movies and user are extracted from this.props rather than from the this.state
    console.log('Movies after the render: ', movies);

    console.log('User after the render: ', user);

    if (movies.length === 0) {
      alert('Movies is an empty array!');
    }

    return (
      <Router>
        {/* MenuBar component with user **prop** (ie. variable) to be passed from parent component (ie. MainView) to MenuBar Child component */}
        {/* {console.log('User state from the Router', user)}
        {console.log('Movies state from the Router', movies)} */}
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

                if (movies.length === 0)
                  return (
                    <div className="main-view">Loading please wait...</div>
                  );

                return (
                  <>
                    {console.log(
                      'Should return the movie list with the following list of movies: ',
                      movies
                    )}
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

                let movie = movies.find((m) => m._id === match.params.movieId);

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movie}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* ======================================= */}
            {/* Read a specific Genre information route */}
            {/* ======================================= */}

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

            {/* ========================================== */}
            {/* Read a specific Director information route */}
            {/* ========================================== */}

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
                console.log('User from the User Profile Route: ', { user });
                console.log('Movies from the User Profile Route: ', { movies });

                return <ProfileView user={user} movies={movies} />;
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
    user: state.userReducer.user,
    movies: state.moviesReducer,
  };
};

// Allows to convert state (in this case our actions/functions) to props and make it available for use in designated components
// Thanks to that we will have access to setMovies and setUser functions (ie. actions) from the props
// This connect method will dispatch the actions
export default connect(mapStateToProps, {
  setUser,
  setMovies,
})(MainView);

MainView.propTypes = {
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
  user: PropTypes.string.isRequired,
};
