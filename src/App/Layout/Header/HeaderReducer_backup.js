let headerReducer = (state = { goClicked: false }, action) => {
  if (action.type === "GO_CLICKED") {
    let newState = { goClicked: true };
    return newState;
  }
  if (action.type === "PROCESS_FINISHED") {
    let newState = { goClicked: false };
    return newState;
  }
  return state;
};

export default headerReducer;
