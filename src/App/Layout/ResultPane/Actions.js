export const segmentSelected = (selectedSegmentIndex) => {
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegmentIndex },
  };
};

export const openPane = () => {
  return {
    type: "OPEN_PANE",
    payload: {},
  };
};

export const closePane = () => {
  return {
    type: "CLOSE_PANE",
    payload: {},
  };
};
