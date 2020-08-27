/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** REDUCER ****************************
const instructionsReducer = (
  // Holds the state of the instructions pane: what step it is in and wether
  // if its open or not
  state = { paneOpen: true, activeStep: 0 },
  action
) => {
  if (action.type === "CLOSE_INSTRUCTIONS") {
    const newState = { ...state, paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_INSTRUCTIONS") {
    const newState = { paneOpen: true, activeStep: 0 };
    return newState;
  }
  if (action.type === "STEP_NEXT") {
    const newState = { ...state, activeStep: state.activeStep + 1 };
    return newState;
  }
  if (action.type === "STEP_BACK") {
    const newState = { ...state, activeStep: state.activeStep + -1 };
    return newState;
  }
  if (action.type === "STEP_RESET") {
    const newState = { ...state, activeStep: 0 };
    return newState;
  }
  return state;
};

export default instructionsReducer;
