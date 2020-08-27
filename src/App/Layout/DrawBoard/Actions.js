/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const mouseDown = () => {
  // Handles the action when the drawing board is being used to make the footer and header
  // slide out of the screen
  return {
    type: "GRID_MOUSE_DOWN",
    payload: {},
  };
};

export const mouseUp = () => {
  // Handles the action when the drawing board is being used to make the footer and header
  // slide back on the screen
  return {
    type: "GRID_MOUSE_UP",
    payload: {},
  };
};
