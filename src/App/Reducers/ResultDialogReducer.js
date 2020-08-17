let resultDialogReducer = (state = { paneOpen: false }, action) => {
  if (action.type === "PROCESS_GRID") {
    let newState = { paneOpen: true };
    return newState;
  }
  if (action.type === "RESET_RESULT") {
    let newState = { paneOpen: false };
    return newState;
  }
  return state;
};

export default resultDialogReducer;
