// Reducers will actually take the actions defined and modify the state of the app for each action

import { combineReducers } from 'redux';

// Import the action types variables from actions.js
import {
  READ_MOVIES_LIST,
  SET_FILTER,
  READ_SELECTED_MOVIE_INFO,
  CREATE_USER,
  READ_USER_PROFILE,
  LOGIN_USER,
  LOGOUT_USER,
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

let initialState = {
  movies: [],
  selectedMovie: null,
};

function movies(state = initialState, action) {
  switch (action.type) {
    case READ_MOVIES_LIST:
      console.log('READ_MOVIES_LIST reducer reached');
      return { ...state, movies: action.value }; // in this case it will return the response.data from axios (ie. the movies list)

    case READ_SELECTED_MOVIE_INFO:
      console.log('READ_SELECTED_MOVIE_INFO reducer reached');
      return { ...state, selectedMovie: action.value };

    default:
      return state;
  }
}

// users Reducer: (will take the actions and states related to the users)
// . Declare users **reducer function** that take a **state** and an **action**
// . null value will only be used to initialize the state. However later the app will use the latest state instead.

// Declare initial State for User as per the data collected from localStorage (browser storage)
let initialUserState = {
  userData: localStorage.getItem('userData'),
};

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case CREATE_USER:
      console.log('CREATE_USER');
      return action.value;

    // case LOGIN_USER:
    //   console.log('LOGIN_USER');
    //   return action.value;

    case READ_USER_PROFILE:
      console.log('READ_USER_PROFILE');
      // Update the userData substate of the state inside Redux store
      // In this case action.value is the loggedIn User Object
      return { ...state, userData: action.value };

    default:
      return state;
  }
}

// Maybe later this should also be part of the userReducer as a substate instead of a stand alone state
function isLoggedUserReducer(state = false, action) {
  switch (action.type) {
    case LOGIN_USER:
      return (state = true);

    case LOGOUT_USER:
      return (state = false);

    default:
      return state;
  }
}

// We use a combiner (combined reducer function) provided by redux in order to club our reducers and export them
const moviesApp = combineReducers({
  visibilityFilterReducer,
  movies,
  userReducer,
  isLoggedUserReducer,
});

// Finally we can export the combined reducer movieApp so it can be used by the store
export default moviesApp;
