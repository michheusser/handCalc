import GridTool from "./GridTool";
import Grid from "../Grid/Grid";

class GridScaler extends GridTool {
  // Decorator for grids, adding additional functionalities (scaling)
  scale(xFields, yFields) {
    let scaledGrid = new Grid(xFields, yFields);
    let scalingX = xFields / this.grid.xFields;
    let scalingY = yFields / this.grid.yFields;
    for (let field of this.grid.fields) {
      let xScaled = Math.floor(field.coordinate.x * scalingX);
      let xScaledNext = Math.floor((field.coordinate.x + 1) * scalingX);
      let yScaled = Math.floor(field.coordinate.y * scalingY);
      let yScaledNext = Math.floor((field.coordinate.y + 1) * scalingY);
      if (xScaledNext >= xFields) {
        xScaledNext = xFields;
      }
      if (yScaledNext >= yFields) {
        yScaledNext = yFields;
      }
      for (let x = xScaled; x < xScaledNext; x++) {
        for (let y = yScaled; y < yScaledNext; y++) {
          scaledGrid.getField(x, y).isFilled = field.isFilled;
        }
      }
    }
    return this.grid.replaceFields(scaledGrid);
  }
  fit(xFields, yFields, xMargin = 0, yMargin = 0, keepRatio = false) {
    if (2 * xMargin >= xFields || 2 * yMargin >= yFields) {
      return this.grid;
    }
    this.grid.tools.gridCropper.wrap();
    if (!keepRatio) {
      this.scale(xFields - 2 * xMargin, yFields - 2 * yMargin);
      this.grid.tools.gridCropper.wrap(xMargin, yMargin);
      return this.grid;
    }
    let [xMin, xMax, yMin, yMax] = this.grid.tools.gridAligner.limits();
    let height = yMax - yMin + 1;
    let width = xMax - xMin + 1;
    let scaleRatio = height / width;
    if (scaleRatio > (yFields - 2 * yMargin) / (xFields - 2 * xMargin)) {
      this.scale(
        Math.floor((yFields - 2 * yMargin) / scaleRatio),
        yFields - 2 * yMargin
      );
    } else {
      this.scale(
        xFields - 2 * xMargin,
        Math.floor((xFields - 2 * xMargin) * scaleRatio)
      );
    }
    this.grid.tools.gridCropper.crop(
      xFields - 2 * yMargin,
      yFields - 2 * yMargin,
      true
    );
    this.grid.tools.gridCropper.addMargins(xMargin, yMargin);
    return this.grid;
  }
}

export default GridScaler;
