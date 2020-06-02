let analysisPaneReducer = (state = { selectedSegment: null }, action) => {
  if (action.type === "SEGMENT_SELECTED") {
    let newState = { selectedSegment: action.payload.selectedSegment };

    return newState;
  }
  return state;
};

export default analysisPaneReducer;
