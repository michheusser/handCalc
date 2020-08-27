/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const processGrid = (xFields, yFields, fields) => {
  // The action contains the information about the drawing and dimensions of the grid and is
  // fed into the DrawBoard reducer to process it
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields, fields: fields },
  };
};

export const clearGrid = () => {
  // Clears the drawing grid
  return {
    type: "CLEAR_GRID",
    payload: {},
  };
};
