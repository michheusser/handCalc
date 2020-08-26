export const segmentSelected = (selectedSegmentIndex) => {
  return {
    type: "SEGMENT_SELECTED",
    payload: { selectedSegment: selectedSegmentIndex },
  };
};
