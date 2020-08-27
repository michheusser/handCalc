/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

let aboutReducer = (state = { paneOpen: false }, action) => {
  if (action.type === "CLOSE_ABOUT") {
    let newState = { paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_ABOUT") {
    let newState = { paneOpen: true };
    return newState;
  }
  return state;
};

export default aboutReducer;
