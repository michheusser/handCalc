export const segmentSelected = (selectedSegment) => {
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegment },
  };
};

export const closePane = () => {
  return {
    type: "RESET_RESULT",
    payload: {},
  };
};
