/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const closeInstructions = () => {
  return {
    type: "CLOSE_INSTRUCTIONS",
    payload: {},
  };
};

export const nextStep = () => {
  return {
    type: "STEP_NEXT",
    payload: {},
  };
};

export const backStep = () => {
  return {
    type: "STEP_BACK",
    payload: {},
  };
};
export const resetStep = () => {
  return {
    type: "STEP_RESET",
    payload: {},
  };
};
