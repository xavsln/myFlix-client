// Reducers will actually take the actions defined and modify the state of the app for each action
// Therefore, Reducers will take the action, the current state or initial state.  After executing the code, it will return an updated state. Then the related componenets will re-render (update)

import { combineReducers } from 'redux';

// Import the action types variables from actions.js
import {
  READ_MOVIES_LIST,
  READ_SELECTED_MOVIE_INFO,
  READ_SELECTED_GENRE,
  READ_SELECTED_DIRECTOR,
  SET_FILTER,
  CREATE_USER,
  READ_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ADD_MOVIE_TO_FAV_LIST,
  REMOVE_MOVIE_FROM_FAV_LIST,
} from '../actions/actions';

// -------------------------
// VISIBILITYFILTER REDUCER:
// -------------------------
// . Declare visibilityFilter **reducer function** that take a **state** and an **action**
// . state = '' will only be used to initialize the state. Then the latest state will be used.

function visibilityFilterReducer(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value; // This is the updated state that is returned

    default:
      return state; // Reducers needs to return a state in any case (as it will be the new case the App will use)
  }
}

// ---------------
// MOVIES REDUCER:
// ---------------
// . Declare movies **reducer function** that take a **state** and an **action**
// . state = [] will only be used to initialize the state. Then the latest state will be used

let initialState = {
  movies: [],
  selectedMovie: null,
};

function movies(state = initialState, action) {
  switch (action.type) {
    case READ_MOVIES_LIST: // Action taken by the Reducer
      console.log('READ_MOVIES_LIST reducer reached');
      return { ...state, movies: action.value }; // Updated state => in this case it will return the response.data from axios (ie. the movies list) as the updated state

    case READ_SELECTED_MOVIE_INFO: // Action taken by the Reducer
      console.log('READ_SELECTED_MOVIE_INFO reducer reached');
      // return { ...state, selectedMovie: action.value }; // updated state
      return { selectedMovie: action.value };

    case READ_SELECTED_GENRE: // Action taken by the Reducer
      console.log('READ_SELECTED_GENRE reducer reached');
      return { ...state, selectedGenre: action.value }; // updated state

    case READ_SELECTED_DIRECTOR: // Action taken by the Reducer
      console.log('READ_SELECTED_DIRECTOR reducer reached');
      return { ...state, selectedDirector: action.value }; // updated state

    default:
      return state;
  }
}

// ----------------------------------------------------------------------
// USERS REDUCER: (will take the actions and states related to the users)
// ----------------------------------------------------------------------
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

    case READ_USER_PROFILE:
      console.log('READ_USER_PROFILE');
      // Update the userData substate of the state inside Redux store
      // In this case action.value is the loggedIn User Object
      return { ...state, userData: action.value };

    case UPDATE_USER_PROFILE:
      console.log('UPDATE_USER_PROFILE');
      // Update the userData substate of the state inside Redux store
      // In this case action.value is the updated data of the loggedIn User Object
      return { ...state, userData: action.value };

    case DELETE_USER:
      console.log('DELETE_USER');
      // Delete the userData substate of the state inside Redux store
      // In this case action.value is the data of the loggedIn User Object (need _id and token)
      // This should delete the User in the DB and remove the data from the local storage
      return { ...state, userData: action.value };

    case ADD_MOVIE_TO_FAV_LIST:
      console.log('ADD_MOVIE_TO_FAV_LIST');
      // Add the movie substate of the state inside Redux store
      // In this case action.value is the data of the movie Object to be added to the list of the loggedIn User Object
      return { ...state, movie: action.value };

    case REMOVE_MOVIE_FROM_FAV_LIST:
      console.log('ADD_MOVIE_FROM_FAV_LIST');
      // Remove the movie substate of the state inside Redux store
      // In this case action.value is the data of the movie Object to be removed from the list of the loggedIn User Object
      return { ...state, movie: action.value };

    case LOGIN_USER:
      console.log('LOGIN_USER started from reducers');
      // return action.value;
      return { ...state, userData: action.value };

    case LOGOUT_USER:
      console.log('LOGOUT_USER action from reducers');
      // return action.value;
      return { ...state, userData: null };

    default:
      return state;
  }
}

// ??? Maybe later this should also be part of the userReducer as a substate instead of a stand alone state
// function isLoggedUserReducer(state = false, action) {
//   switch (action.type) {
//     case LOGIN_USER:
//       console.log(
//         'Login user case from isLoggedUserReducer triggered + state: ',
//         state
//       );
//       console.log('Current state: ', state);
//       return (state = true);
//     case LOGOUT_USER:
//       return (state = false);
//     default:
//       return state;
//   }
// }

// We use a combiner (combined reducer function) provided by redux in order to club our reducers and export them
const moviesApp = combineReducers({
  visibilityFilterReducer,
  movies,
  userReducer,
  // isLoggedUserReducer,
});

// Finally we can export the combined reducer movieApp so it can be used by the store
export default moviesApp;