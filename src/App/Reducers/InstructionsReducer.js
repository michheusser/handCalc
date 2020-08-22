let instructionsReducer = (state = { paneOpen: true }, action) => {
  if (action.type === "CLOSE_INSTRUCTIONS") {
    let newState = { paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_INSTRUCTIONS") {
    let newState = { paneOpen: true };
    return newState;
  }
  return state;
};

export default instructionsReducer;
