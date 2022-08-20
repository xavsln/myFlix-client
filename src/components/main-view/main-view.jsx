import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    super();
    // we initialize MainView component's state (ie. components data)
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    // We use axios library to fetch data from our API
    axios
      .get('https://themyflixapp.herokuapp.com/movies')
      .then((response) => {
        // We update the movie variable contained inside the component's state
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    // We update the value of the variable selectedMovie inside the component's state
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    // We update the user variable stored into the state of the MainView component
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}
