/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const mouseDown = () => {
  return {
    type: "GRID_MOUSE_DOWN",
    payload: {},
  };
};

export const mouseUp = () => {
  return {
    type: "GRID_MOUSE_UP",
    payload: {},
  };
};
