import GridGenerator from "../Libraries/GridLibrary/GridGenerator";

let segmentListReducer = (
  state = {
    boardGridSegments: [],
  },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    let activeFields = [];
    for (let x = 0; x < action.payload.fields.length; x++) {
      for (let y = 0; y < action.payload.fields[0].length; y++) {
        if (action.payload.fields[x][y]) {
          activeFields.push([x, y]);
        }
      }
    }

    let newState = {
      boardGridSegments: new GridGenerator()
        .createGrid(
          action.payload.xFields,
          action.payload.yFields,
          activeFields
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
