let analysisPaneReducer = (
  state = { paneOpen: false, selectedSegment: 0 },
  action
) => {
  if (action.type === "OPEN_PANE") {
    let newState = { paneOpen: true, selectedSegment: 0 };
    return newState;
  }
  if (action.type === "CLOSE_PANE") {
    let newState = { paneOpen: false, selectedSegment: state.selectedSegment };
    return newState;
  }
  if (action.type === "SEGMENT_SELECTED") {
    let newState = {
      paneOpen: state.paneOpen,
      selectedSegment: action.payload.selectedSegment,
    };

    return newState;
  }
  return state;
};

export default analysisPaneReducer;
