import React from 'react';

import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

export function DirectorView(props) {
  console.log(props);
  return (
    <>
      <h5>Name:</h5>
      <p>{props.director.Name}</p>

      <h5>Bio:</h5>
      <p className="text-justify">{props.director.Bio}</p>

      <Button onClick={props.onBackClick}>Back</Button>
    </>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
