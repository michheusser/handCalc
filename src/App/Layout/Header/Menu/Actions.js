/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const openInstructions = () => {
  // Opens the instructions pane
  return {
    type: "OPEN_INSTRUCTIONS",
    payload: {},
  };
};

export const openAbout = () => {
  // Opens the About pane
  return {
    type: "OPEN_ABOUT",
    payload: {},
  };
};
