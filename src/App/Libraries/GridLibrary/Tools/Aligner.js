/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Tool from "./Tool";

class Aligner extends Tool {
  // Decorator for grids, adding additional functionalities (aligning / centering)
  limits() {
    let xMin = this.grid.xFields - 1;
    let xMax = 0;
    let yMin = this.grid.yFields - 1;
    let yMax = 0;
    for (let field of this.grid.fields) {
      if (field.isFilled && field.coordinate.x < xMin) {
        xMin = field.coordinate.x;
      }
      if (field.isFilled && field.coordinate.x > xMax) {
        xMax = field.coordinate.x;
      }
      if (field.isFilled && field.coordinate.y < yMin) {
        yMin = field.coordinate.y;
      }
      if (field.isFilled && field.coordinate.y > yMax) {
        yMax = field.coordinate.y;
      }
    }
    return [xMin, xMax, yMin, yMax];
  }
  shift(xOffset, yOffset) {
    if (xOffset === 0 && yOffset === 0) {
      return this.grid;
    }
    let tempGrid = this.grid.tools.cloner.clone();
    for (let field of this.grid.fields) {
      let tempField = tempGrid.getField(
        field.coordinate.x - xOffset,
        field.coordinate.y - yOffset
      );
      if (tempField === null) {
        field.isFilled = false;
      } else {
        field.isFilled = tempField.isFilled;
      }
    }
    return this.grid;
  }
  align() {
    // Shifts all fields to be aligned on the horizontal and vertical axis
    let [xMin, xMax, yMin, yMax] = this.limits();
    let xMargin = Math.ceil((this.grid.xFields - (xMax - xMin + 1)) / 2);
    let yMargin = Math.ceil((this.grid.yFields - (yMax - yMin + 1)) / 2);
    this.shift(-xMin + xMargin, -yMin + yMargin);
    return this.grid;
  }
}
export default Aligner;
