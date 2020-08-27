/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const closeInstructions = () => {
  // Closes the instructions pane
  return {
    type: "CLOSE_INSTRUCTIONS",
    payload: {},
  };
};

export const nextStep = () => {
  // Changes the current step whithin the instructions pane to the next one
  return {
    type: "STEP_NEXT",
    payload: {},
  };
};

export const backStep = () => {
  // Changes the current step whithin the instructions pane to the previous one
  return {
    type: "STEP_BACK",
    payload: {},
  };
};
export const resetStep = () => {
  // Changes the current step whithin the instructions pane to the first one
  return {
    type: "STEP_RESET",
    payload: {},
  };
};
