import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    // return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    return (
      <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={movie.ImagePath}  alt="Poster image of the movie" crossorigin="anonymous" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description.substring(0, 200)}... (open to read more)</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
      </Card.Body>
    </Card>
    )

  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date).isRequired // => To be checked
    }),
    ImagePath: PropTypes.string.isRequired,
    Rating: PropTypes.number.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};