export const segmentSelected = (selectedSegment) => {
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegment },
  };
};
