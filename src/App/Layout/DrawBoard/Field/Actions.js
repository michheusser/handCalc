/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const changeField = (x, y, isFilled) => {
  // Is triggered whenever a the value of a field (filled/unfilled) within the drawing
  // board is changed, containing the coordinates of the field within the board and its value
  return {
    type: "CHANGE_FIELD",
    payload: { x: x, y: y, isFilled: isFilled },
  };
};
