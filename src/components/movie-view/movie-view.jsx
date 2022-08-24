import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center mt-5">
        <Col>
          <div className="movie-poster mb-1">
            <img
              src={movie.ImagePath}
              className="img-fluid"
              alt="Poster image of the movie"
              crossorigin="anonymous"
            />
          </div>
        </Col>

        <Col md={7}>
          <div className="movie-title mb-1">
            <span className="label font-weight-bold">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description text-justify mb-1">
            <span className="label font-weight-bold">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre-name mb-1">
            <span className="label font-weight-bold">
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
            </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director-name mb-1">
            <span className="label font-weight-bold">
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director: </Button>
              </Link>
            </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="movie-rating mb-3">
            <span className="label font-weight-bold">Rating: </span>
            <span className="value">{movie.Rating}</span>
          </div>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date).isRequired, // => To be checked
    }),
    ImagePath: PropTypes.string.isRequired,
    Rating: PropTypes.number.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
