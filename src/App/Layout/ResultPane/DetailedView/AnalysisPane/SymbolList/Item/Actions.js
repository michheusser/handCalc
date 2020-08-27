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
