import GridGenerator from "./GridLibrary";

let gridReducer = (
  state = {
    filledFields: [],
    boardGrid: new GridGenerator().createGrid(),
    boardGridSegments: [],
  },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    let newState = {
      boardGrid: new GridGenerator().createGrid(
        action.payload.xFields,
        action.payload.yFields
      ),
    };
    newState.boardGridSegments = newState.boardGrid.tools.gridSegmentator.createSegments(
      {
        xFields: 28,
        yFields: 28,
        xMargin: 1,
        yMargin: 1,
        keepRatio: true,
      }
    );
    console.log("[gridReducer] gridReducer on PROCESS_GRID executed.");
    return newState;
  } else if (action.type === "TOGGLE_FIELD") {
    return state;
  }
  console.log(`[gridReducer] Reducer executed with no changes`);
  return state;
};

export default gridReducer;
