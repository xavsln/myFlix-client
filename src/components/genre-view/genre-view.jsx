import React from 'react';

import { Button } from 'react-bootstrap';

export function GenreView(props) {
  console.log(props);

  return (
    <div>
      <h5>Genre:</h5>
      <p> {props.genre.Name}</p>

      <h5>Description:</h5>
      <p className="text-justify">{props.genre.Description}</p>

      <Button onClick={props.onBackClick}>Back</Button>
    </div>
  );
}
