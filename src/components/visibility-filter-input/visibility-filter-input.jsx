import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    // <div className="filter-field">
    <Form.Control
      controlId="formFilter"
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="filter"
    />
    // </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
