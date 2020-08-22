let aboutReducer = (state = { paneOpen: false }, action) => {
  if (action.type === "CLOSE_ABOUT") {
    let newState = { paneOpen: false };
    return newState;
  }
  if (action.type === "OPEN_ABOUT") {
    let newState = { paneOpen: true };
    return newState;
  }
  return state;
};

export default aboutReducer;
