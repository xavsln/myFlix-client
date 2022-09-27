import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

// import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
  const { visibilityFilterReducer } = state;
  return { visibilityFilterReducer };
};

function MoviesList(props) {
  const { movies, visibilityFilterReducer } = props;
  let filteredMovies = movies;

  if (visibilityFilterReducer !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilterReducer.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return filteredMovies.map((m) => (
    <Col lg={3} md={4} sm={6} xs={12} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ));
}

export default connect(mapStateToProps)(MoviesList);
