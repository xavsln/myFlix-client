// Reducers will actually take the actions defined and modify the state of the app for each action

import { combineReducers } from 'redux';

// Import the action types variables
import { READ_MOVIES_LIST, SET_FILTER } from '../actions/actions';

// Declare visibilityFilter **reducer function** that take a **state** and an **action**
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// Declare movies **reducer function** that take a **state** and an **action**
function movies(state = [], action) {
  switch (action.type) {
    case READ_MOVIES_LIST:
      console.log('READ_MOVIES_LIST reducer reached');
      return action.value;
    default:
      return state;
  }
}

// We use a combiner (combined reducer function) provided by redux in order to club our reducers and export them
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
});

// Finally we can export the combined reducer movieApp
export default moviesApp;
