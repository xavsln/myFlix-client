// ===================
// ACTIONS DECLARATION
// ===================

// #1. Declare the App actions types:
// a. 'SET_MOVIES' is one action type
// b. Store this action type inside a variable

// Actions related to Movies' substate
export const READ_MOVIES_LIST = 'READ_MOVIES_LIST';
export const READ_SELECTED_MOVIE_INFO = 'READ_SELECTED_MOVIE_INFO';
export const READ_SELECTED_GENRE = 'READ_SELECTED_GENRE';
export const READ_SELECTED_DIRECTOR = 'READ_SELECTED_DIRECTOR';
export const SET_FILTER = 'SET_FILTER';

// Actions related to Users' substate
export const CREATE_USER = 'CREATE_USER';
export const READ_USER_PROFILE = 'READ_USER_PROFILE';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const DELETE_USER = 'DELETE_USER';
export const ADD_MOVIE_TO_FAV_LIST = 'ADD_MOVIE_TO_FAV_LIST';
export const REMOVE_MOVIE_FROM_FAV_LIST = 'REMOVE_MOVIE_FROM_FAV_LIST';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// ================
// ACTIONS CREATION
// ================

// #2. Add an **action creator**, ie. a JS function that will return an action (ie. the function will return a type and a value)
// When these functions are called in the main-view.jsx file, it will trigger the below actions:

// . Movie related action creators:
// --------------------------------

export function readMoviesList(value) {
  console.log('READ_MOVIES_LIST action triggered');
  return {
    type: READ_MOVIES_LIST,
    value, // value is the full list of movies fetched from the API
  };
}

// When readSelectedMovieInfo function is called from the MainView component, the following will be triggered:
export function readSelectedMovieInfo(value) {
  console.log('READ_SELECTED_MOVIE_INFO action triggered');
  return {
    type: READ_SELECTED_MOVIE_INFO,
    value,
  };
}

// When readSelectedMovieInfo function is called from the MainView component, the following will be triggered:
export function readSelectedGenre(value) {
  console.log('READ_SELECTED_GENRE action triggered');
  return {
    type: READ_SELECTED_GENRE,
    value,
  };
}

// When readSelectedMovieInfo function is called from the MainView component, the following will be triggered:
export function readSelectedDirector(value) {
  console.log('READ_SELECTED_Director action triggered');
  return {
    type: READ_SELECTED_DIRECTOR,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

// . User related action creators:

export function createUser(value) {
  console.log('CREATE_USER action triggered');
  return {
    type: CREATE_USER,
    value,
  };
}

// This action will take the User data as input data (ie. value)
export function readUserProfile(value) {
  console.log('READ_USER_PROFILE action triggered');
  return {
    type: READ_USER_PROFILE,
    value,
  };
}

// This action will take the updated User data as input data (ie. value)
export function updateUserProfile(value) {
  console.log('UPDATE_USER_PROFILE action triggered');
  return {
    type: UPDATE_USER_PROFILE,
    value,
  };
}

export function deleteUser(value) {
  console.log('DELETE_USER action triggered');
  return {
    type: DELETE_USER,
    value,
  };
}

export const loginUser = (value) => {
  console.log('LOGIN_USER action triggered');
  return {
    type: LOGIN_USER,
    value,
  };
};

// When called, this action will logout the user
export const logoutUser = () => {
  console.log('LOGOUT_USER action triggered');
  return {
    type: LOGOUT_USER,
  };
};

export const addMovieToFavList = (value) => {
  console.log('ADD_MOVIE_TO_FAV_LIST action triggered');
  return {
    type: ADD_MOVIE_TO_FAV_LIST,
    value, // value here should be the Movie Object to be added to the List of favorites
  };
};

export const removeMovieFromFavList = () => {
  console.log('REMOVE_MOVIE_FROM_FAV_LIST action triggered');
  return {
    type: REMOVE_MOVIE_FROM_FAV_LIST,
    value, // value here should be the Movie Object to be removed from the List of favorites
  };
};
