// #1. Declare the App actions types:
// a. 'SET_MOVIES' is one action type
// b. Store this action type inside a variable

export const READ_MOVIES_LIST = 'READ_MOVIES_LIST';
export const READ_SELECTED_MOVIE_INFO = 'READ_SELECTED_MOVIE_INFO';
export const SET_FILTER = 'SET_FILTER';

export const CREATE_USER = 'CREATE_USER';
export const READ_USER_PROFILE = 'READ_USER_PROFILE';

// #2. Add an **action creator**, ie. a JS function that will return an action (ie. the function will return a type and a value)
// When these functions are called in the main-view.jsx file, it will trigger the below actions:

export function readMoviesList(value) {
  console.log('READ_MOVIES_LIST action triggered');
  return {
    type: READ_MOVIES_LIST,
    value,
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

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function createUser(value) {
  console.log('CREATE_USER action triggered');
  return {
    type: CREATE_USER,
    value,
  };
}

// This action will take the Username as input data (ie. value)
export function readUserProfile(value) {
  console.log('READ_USER_PROFILE action triggered');
  return {
    type: READ_USER_PROFILE,
    value,
  };
}

export const loginUser = () => {
  console.log('LOGIN_USER action triggered');
  return {
    type: 'LOGIN_USER',
  };
};

// When called, this action will logout the user
export const logoutUser = () => {
  console.log('LOGOUT_USER action triggered');
  return {
    type: 'LOGOUT_USER',
  };
};
