import GridGenerator from "./GridLibrary";

let gridReducer = (
  state = {
    filledFields: [],
    boardGrid: null,
    boardGridSegments: [],
  },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    let newState = {
      filledFields: [...state.filledFields],
      boardGrid: new GridGenerator().createGrid(
        action.payload.xFields,
        action.payload.yFields,
        state.filledFields
      ),
      boardGridSegments: [],
    };
    newState.boardGridSegments = newState.boardGrid.tools.gridSegmentator.createSegments(
      {
        xFields: 100,
        yFields: 100,
        xMargin: 1,
        yMargin: 1,
        keepRatio: true,
      }
    );

    //console.log("[gridReducer] gridReducer on PROCESS_GRID executed.");
    return newState;
  } else if (action.type === "FIELD_CLICKED") {
    let newState = {
      ...state,
      filledFields: [...state.filledFields],
      boardGrid: null,
      boardGridSegments: [],
    };
    if (action.payload.active) {
      if (
        !newState.filledFields.find(
          (field) => field === [action.payload.x, action.payload.y]
        )
      ) {
        newState.filledFields.push([action.payload.x, action.payload.y]);
      }
    } else {
      newState.filledFields = newState.filledFields.filter(
        (field) =>
          !(field[0] === action.payload.x && field[1] === action.payload.y)
      );
    }
    //console.log("[gridReducer] gridReducer on FIELD_CLICKED executed.");
    return newState;
  }
  //console.log("[gridReducer] Executed with no changes");
  return state;
};

export default gridReducer;
