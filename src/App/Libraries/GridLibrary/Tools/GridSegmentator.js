import GridTool from "./GridTool";

import GridGenerator from "../GridGenerator";

class GridSegmentator extends GridTool {
  // Takes a grid as an input and creates grids of equal size containing each agglomeration of filled fields
  constructor() {
    super();
    this.segments = [];
  }
  clearSegments() {
    this.segments = [];
    return this.grid;
  }
  agglomerate(
    grid,
    gridSegment,
    x,
    y // Recursive algorithm to agglomerate fields with touching fields. It takes the agglomerated points from grid to segment grid and empties the fields in the original grid
  ) {
    if (grid.getField(x, y) === null || !grid.getField(x, y).isFilled) {
      return null;
    }
    gridSegment.fill(x, y);
    grid.clear(x, y);
    let positions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let position of positions) {
      this.agglomerate(grid, gridSegment, x + position[0], y + position[1]);
    }
    return true;
  }
  createSegments(fitData = null) {
    // Segments the grid and allocates the segments in this.segments.

    this.clearSegments();
    let grid = this.grid.tools.gridCloner.clone(); // creates clone of original grid

    for (let y = 0; y < grid.yFields; y++) {
      for (let x = 0; x < grid.xFields; x++) {
        if (grid.getField(x, y).isFilled) {
          let gridSegment = new GridGenerator().createGrid(
            grid.xFields,
            grid.yFields
          );

          this.agglomerate(grid, gridSegment, x, y);

          this.segments.push(gridSegment);
        }
      }
    }
    if (fitData) {
      this.fitSegments(
        fitData.xFields,
        fitData.yFields,
        fitData.xMargin,
        fitData.yMargin,
        fitData.keepRatio
      );
    }

    return this.segments;
  }
  fitSegments(xFields, yFields, xMargin = 0, yMargin = 0, keepRatio = false) {
    for (let segment of this.segments) {
      segment.tools.gridScaler.fit(
        xFields,
        yFields,
        xMargin,
        yMargin,
        keepRatio
      );
    }
    return this.grid;
  }
}

export default GridSegmentator;
