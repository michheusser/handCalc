import GridGenerator from "./GridLibrary";

let gridReducer = (
  state = { boardGrid: new GridGenerator().createGrid(111, 44).fill(2, 2) },
  action
) => {
  if (action.type === "TOGGLE_FIELD") {
    let newState = { boardGrid: state.boardGrid.tools.gridCloner.clone() };
    newState.boardGrid.toggle(action.x, action.y);
    return newState;
  }
  console.log(`Reducer executed with no changes`);
  return state;
};

export default gridReducer;
