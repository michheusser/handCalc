import GridTool from "./GridTool";
import Grid from "../Grid/Grid";

class GridCropper extends GridTool {
  // Decorator for grids, adding additional functionalities (cropping)
  crop(
    xFields,
    yFields,
    align = false // crops grid to a new grid of the given dimension. If the dimensions are bigger, new empty fields are added.
  ) {
    if (xFields < 1) {
      xFields = 1;
    }
    if (yFields < 1) {
      yFields = 1;
    }
    let croppedGrid = new Grid(xFields, yFields);
    for (let field of croppedGrid.fields) {
      let fieldToCopy = this.grid.getField(
        field.coordinate.x,
        field.coordinate.y
      );
      if (fieldToCopy === null) {
        field.isFilled = false;
      } else {
        field.isFilled = fieldToCopy.isFilled;
      }
    }
    this.grid.replaceFields(croppedGrid);
    if (align) {
      this.grid.tools.gridAligner.align();
    }
    return this.grid;
  }
  addMargins(xMargin = 0, yMargin = 0) {
    if (xMargin < 0 || yMargin < 0) {
      return this;
    }
    this.grid.tools.gridCropper.crop(
      this.grid.xFields + 2 * xMargin,
      this.grid.yFields + 2 * yMargin
    );
    this.grid.tools.gridAligner.shift(xMargin, yMargin);
    return this.grid;
  }
  wrap(
    xMargin = 0,
    yMargin = 0 // crops from both sides to the smallest possible grid with margins (if selected the smalles possible square grid).
  ) {
    let [xMin, xMax, yMin, yMax] = this.grid.tools.gridAligner.limits();
    let height = yMax - yMin + 1;
    let width = xMax - xMin + 1;
    this.grid.tools.gridAligner.shift(-xMin, -yMin);
    this.grid.tools.gridCropper.crop(width + 2 * xMargin, height + 2 * yMargin);
    this.grid.tools.gridAligner.shift(xMargin, yMargin);
    return this.grid;
  }
}
export default GridCropper;
