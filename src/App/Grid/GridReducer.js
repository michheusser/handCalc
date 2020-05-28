let gridReducer = (
  state = {
    activeFields: [],
  },
  action
) => {
  if (action.type === "FIELD_CLICKED") {
    let newState = {
      ...state,
      activeFields: [...state.activeFields],
    };
    if (
      !newState.activeFields.find(
        (field) => field === [action.payload.x, action.payload.y]
      )
    ) {
      newState.activeFields.push([action.payload.x, action.payload.y]);
    } else {
      newState.activeFields = newState.activeFields.filter(
        (field) =>
          !(field[0] === action.payload.x && field[1] === action.payload.y)
      );
    }
    return newState;
  }
  return state;
};

export default gridReducer;
