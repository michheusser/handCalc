let headerReducer = (state = { fields: null }, action) => {
  if (action.type === "INITIALIZE_FIELDS") {
    let newState = {
      fields: new Array(this.props.xFields)
        .fill(null)
        .map((_) => new Array(this.props.yFields).fill(false)),
    };
    return newState;
  }
  if (action.type === "PROCESS_FINISHED") {
    let newState = { goClicked: false };
    return newState;
  }
  return state;
};

export default headerReducer;
