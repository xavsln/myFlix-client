// ===================
// ACTIONS DECLARATION
// ===================

// #1. Declare the App actions types:
// a. 'SET_MOVIES' is one action type
// b. Store this action type inside a variable

export const SET_MOVIES = 'SET_MOVIES'; // Declare SET_MOVIES action. When called, this action will store the list of movies so it can be used by different components of the App
export const SET_FILTER = 'SET_FILTER'; // Declare SET_FILTER action. When called, this action will store the filter data so it can be used by different components of the App
export const SET_USER = 'SET_USER'; // Declare SET_USER action. When called, this action will store the User data so it can be used by different components of the App

// ================
// ACTIONS CREATION
// ================

// #2. Add an **action creator**, ie. a JS function that will return an action (ie. the function will return a type and a value)
// When these functions are called in the main-view.jsx file, it will trigger the below actions:

// . Movie related action creators:
// --------------------------------

export function setMovies(value) {
  console.log('SET_MOVIES action triggered');
  return {
    type: SET_MOVIES,
    value, // Value will be the movies list
  };
}

// . Filter related action creators:
// ---------------------------------

export function setFilter(value) {
  console.log('SET_FILTER action triggered');
  return {
    type: SET_FILTER,
    value, // Value will be the string entered into the search bar
  };
}

// . User related action creators:
// -------------------------------

export function setUser(value) {
  console.log('SET_USER action triggered');
  return {
    type: SET_USER,
    value, // Value will be the loggedIn User data
  };
}
