import GridTool from "./GridTool";
import GridGenerator from "../GridGenerator";

class GridCloner extends GridTool {
  clone() {
    let clonedGrid = new GridGenerator().createGrid(
      this.grid.xFields,
      this.grid.yFields
    );
    for (let i = 0; i < clonedGrid.fields.length; i++) {
      clonedGrid.fields[i].isFilled = this.grid.fields[i].isFilled;
    }
    return clonedGrid;
  }
}

export default GridCloner;
