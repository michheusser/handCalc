import GridGenerator from "../Grid/GridLibrary";

let segmentListReducer = (
  state = {
    boardGridSegments: [],
  },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    let newState = {
      boardGridSegments: new GridGenerator()
        .createGrid(
          action.payload.xFields,
          action.payload.yFields,
          action.payload.activeFields
        )
        .tools.gridSegmentator.createSegments({
          xFields: 100,
          yFields: 100,
          xMargin: 1,
          yMargin: 1,
          keepRatio: true,
        }),
    };
    return newState;
  }
  return state;
};

export default segmentListReducer;
