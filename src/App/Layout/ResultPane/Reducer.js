/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** REDUCER ****************************
let resultPaneReducer = (
  // Contains the state of the result pane, which is, wether if its open or closed, and the
  // selected segment to show the details on
  state = { paneOpen: false, selectedSegment: 0 },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    const newState = { paneOpen: true, selectedSegment: 0 };
    return newState;
  }
  if (action.type === "CLOSE_PANE") {
    const newState = {
      paneOpen: false,
      selectedSegment: state.selectedSegment,
    };
    return newState;
  }
  if (action.type === "SEGMENT_SELECTED") {
    const newState = {
      paneOpen: state.paneOpen,
      selectedSegment: action.payload.selectedSegment,
    };

    return newState;
  }
  return state;
};

export default resultPaneReducer;
