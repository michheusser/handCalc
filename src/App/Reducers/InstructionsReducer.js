/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

let instructionsReducer = (
  state = { paneOpen: true, activeStep: 0 },
  action
) => {
  if (action.type === "CLOSE_INSTRUCTIONS") {
    let newState = { ...state, paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_INSTRUCTIONS") {
    let newState = { paneOpen: true, activeStep: 0 };
    return newState;
  }
  if (action.type === "STEP_NEXT") {
    let newState = { ...state, activeStep: state.activeStep + 1 };
    return newState;
  }
  if (action.type === "STEP_BACK") {
    let newState = { ...state, activeStep: state.activeStep + -1 };
    return newState;
  }
  if (action.type === "STEP_RESET") {
    let newState = { ...state, activeStep: 0 };
    return newState;
  }
  return state;
};

export default instructionsReducer;
