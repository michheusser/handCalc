import Grid from "./Grid/Grid";
import GridCloner from "./Tools/GridCloner";
import GridAligner from "./Tools/GridAligner";
import GridCropper from "./Tools/GridCropper";
import GridScaler from "./Tools/GridScaler";
import GridSegmentator from "./Tools/GridSegmentator";
import GridManipulator from "./Tools/GridManipulator";

class GridGenerator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new GridCloner(),
      new GridAligner(),
      new GridCropper(),
      new GridScaler(),
      new GridSegmentator(),
      new GridManipulator()
    );
    return this;
  }
  addTools(grid) {
    //let counter = 0;
    for (let tool of this.tools) {
      grid.addTool(tool);
      //  counter++;
    }

    return grid;
  }
  fillFields(grid, fields) {
    for (let field of fields) {
      grid.fill(field[0], field[1]);
    }
  }
  createGrid(xFields, yFields, fields = []) {
    let newGrid = new Grid(xFields, yFields);
    this.loadTools().addTools(newGrid);
    this.fillFields(newGrid, fields);

    return newGrid;
  }
}

export default GridGenerator;
