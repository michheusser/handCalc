/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** REDUCER ****************************
const aboutReducer = (state = { paneOpen: false }, action) => {
  // Handles wether the the component is open or closed with the corresponding
  // open/close actions
  if (action.type === "CLOSE_ABOUT") {
    const newState = { paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_ABOUT") {
    const newState = { paneOpen: true };
    return newState;
  }
  return state;
};

export default aboutReducer;
