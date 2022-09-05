// #1. Declare the App actions types:
// a. 'SET_MOVIES' is one action type
// b. Store this action type inside a variable

export const READ_MOVIES_LIST = 'READ_MOVIES_LIST';
export const SET_FILTER = 'SET_FILTER';

// #2. Add an **action creator**, ie. a JS function that will return an action (ie. the function will return a type and a value)
export function readMoviesList(value) {
  console.log('READ_MOVIES_LIST action triggered');
  return { type: READ_MOVIES_LIST, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}
