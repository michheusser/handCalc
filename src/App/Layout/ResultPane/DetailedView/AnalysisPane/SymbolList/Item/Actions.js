/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const segmentSelected = (selectedSegmentIndex) => {
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegmentIndex },
  };
};
