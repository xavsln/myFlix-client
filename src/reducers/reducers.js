// Reducers will actually take the actions defined and modify the state of the app for each action
// Therefore, Reducers will take the action, the current state or initial state.  After executing the code, it will return an updated state. Then the related componenets will re-render (update)

import { combineReducers } from 'redux';

// Import the action types variables from actions.js
import { SET_MOVIES, SET_FILTER, SET_USER } from '../actions/actions';

// -------------------------
// VISIBILITYFILTER REDUCER:
// -------------------------
// . Declare visibilityFilter **reducer function** that take a **state** and an **action**
// . state = '' will only be used to initialize the state. Then the latest state will be used.

function visibilityFilterReducer(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value; // This is the new state (ie. variable) that is returned (ie. the updated string from the search bar)

    default:
      return state; // Reducers needs to return a state in any case (as it will be the new case the App will use)
  }
}

// ---------------
// MOVIES REDUCER:
// ---------------
// . Declare movies **reducer function** that take a **state** and an **action**
// . state = [] will only be used to initialize the state. Then the latest state will be used

// let initialState = {
//   movies: [],
//   // selectedMovie: null, // We can also store substates. It can be declared here.
// };

function moviesReducer(state = [], action) {
  switch (action.type) {
    case SET_MOVIES: // Action taken by the Reducer
      console.log('SET_MOVIES reducer reached');
      return action.value; // Will return the new state => in this case it will return the response.data from axios (ie. the movies list) as the new state

    default:
      return state;
  }
}

// ----------------------------------------------------------------------
// USER REDUCER: (will take the actions and states related to the user)
// ----------------------------------------------------------------------
// . Declare user **reducer function** that take a **state** and an **action**
// . null value will only be used to initialize the state. However later the app will use the latest state instead.

// Declare initial State for User as per the data collected from localStorage (browser storage)
// let initialUserState = {
//   userData: localStorage.getItem('userData'),
// };

function userReducer(state = '', action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER triggered from reducers.js');
      return action.value || localStorage.getItem('user');

    default:
      return state;
  }
}

// We use a combiner (combined reducer function) provided by redux in order to club our reducers and export them
const moviesAppReducers = combineReducers({
  visibilityFilterReducer,
  moviesReducer,
  userReducer,
});

// Finally we can export the combined reducer movieApp so it can be used by the store
export default moviesAppReducers;
