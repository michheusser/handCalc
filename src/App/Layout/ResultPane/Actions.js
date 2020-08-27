/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const segmentSelected = (selectedSegmentIndex) => {
  // Sets the state of the result pane reducer to the given selected segment
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegmentIndex },
  };
};

export const openPane = () => {
  // Sets the state to open the result pane to true, to open it
  return {
    type: "OPEN_PANE",
    payload: {},
  };
};

export const closePane = () => {
  //  Sets the state to open the result pane to false, to close it
  return {
    type: "CLOSE_PANE",
    payload: {},
  };
};
