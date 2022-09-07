// Reducers will actually take the actions defined and modify the state of the app for each action

import { combineReducers } from 'redux';

// Import the action types variables from actions.js
import {
  READ_MOVIES_LIST,
  SET_FILTER,
  READ_SELECTED_MOVIE_INFO,
} from '../actions/actions';

// visibilityFilter Reducer:
// -------------------------
// . Declare visibilityFilter **reducer function** that take a **state** and an **action**
// . state = '' will only be used to initialize the state. Then the latest state will be used.

function visibilityFilterReducer(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;

    default:
      return state; // Reducers needs to return a state in any case (as it will be the new case the App will use)
  }
}

// movies Reducer:
// ---------------
// . Declare movies **reducer function** that take a **state** and an **action**
// . state = [] will only be used to initialize the state. Then the latest state will be used

function movies(state = [], action) {
  switch (action.type) {
    case READ_MOVIES_LIST:
      console.log('READ_MOVIES_LIST reducer reached');
      return action.value; // in this case it will return the response.data from axios (ie. the movies list)

    case READ_SELECTED_MOVIE_INFO:
      console.log('READ_SELECTED_MOVIE_INFO reducer reached');
      return action.value;

    default:
      return state;
  }
}

// users Reducer: (will take the actions and states related to the users)
// . Declare users **reducer function** that take a **state** and an **action**
// . null value will only be used to initialize the state. However later the app will use the latest state instead.

// function userReducer(state = null, action) {
//   switch (action.type) {
//     case LOGIN_USER:
//       console.log('LOGIN_USER');
//       return action.value;

//     case READ_USER_PROFILE:
//       console.log('READ_USER_PROFILE');
//       return action.value;

//     default:
//       return state;
//   }
// }

// We use a combiner (combined reducer function) provided by redux in order to club our reducers and export them
const moviesApp = combineReducers({
  visibilityFilterReducer,
  movies,
});

// Finally we can export the combined reducer movieApp so it can be used by the store
export default moviesApp;
