/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Tool from "./Tool";

import Generator from "../Generator";

class Segmentator extends Tool {
  // Takes a grid as an input and creates grids of equal size containing each agglomeration of filled fields
  constructor() {
    super();
    this.segments = [];
  }
  clearSegments() {
    this.segments = [];
    return this.grid;
  }
  agglomerate(grid, gridSegment, x, y) {
    // Recursive algorithm to agglomerate fields with touching fields. It takes the agglomerated points from grid to segment grid and empties the fields in the original grid
    if (grid.getField(x, y) === null || !grid.getField(x, y).isFilled) {
      return null;
    }
    gridSegment.fill(x, y);
    grid.clear(x, y);
    const positions = [
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
    // Segments the grid and allocates the segments in this.segments. It there is fit data
    // available it renders the segments to the desired proportions accordint to the
    // fit() function and orders them according to their center of mass in the horizontal axis.
    this.clearSegments();
    const grid = this.grid.tools.cloner.clone();

    for (let y = 0; y < grid.yFields; y++) {
      for (let x = 0; x < grid.xFields; x++) {
        if (grid.getField(x, y).isFilled) {
          let gridSegment = new Generator().createGrid(
            grid.xFields,
            grid.yFields
          );
          // Uses the recursive algorithm to agglomerate pixels that are next to each other
          this.agglomerate(grid, gridSegment, x, y);
          this.segments.push(gridSegment);
        }
      }
    }
    // Orders segments according to their center of mass
    this._orderSegments();
    if (fitData) {
      this.fitSegments(
        fitData.xFields,
        fitData.yFields,
        fitData.xMargin,
        fitData.yMargin,
        fitData.keepRatio,
        fitData.scaleStroke,
        fitData.initialWrap
      );
    } else {
      this.wrapSegments();
    }

    return this.segments;
  }

  wrapSegments() {
    // Wraps all segments to have no margins
    for (let segment of this.segments) {
      segment.tools.cropper.wrap();
    }
    return this.grid;
  }
  // Fits all segments to a specified fit data
  fitSegments(
    xFields,
    yFields,
    xMargin = 0,
    yMargin = 0,
    keepRatio = true,
    scaleStroke = true,
    initialWrap = true
  ) {
    for (let segment of this.segments) {
      segment.tools.scaler.fit(
        xFields,
        yFields,
        xMargin,
        yMargin,
        keepRatio,
        scaleStroke,
        initialWrap
      );
    }
    return this.grid;
  }
  makeSquareSegments() {
    // Makes all segments square according to the makeSquare function
    for (let segment of this.segments) {
      segment.tools.scaler.makeSquare();
    }
    return this.grid;
  }

  _centerOfMass(segment) {
    let xM = 0;
    let filledFields = 0;
    for (let field of segment.fields) {
      if (field.isFilled) {
        xM += field.coordinate.x;
        filledFields++;
      }
    }
    return xM / filledFields;
  }

  _orderSegments() {
    let centerOfMassArray = [];
    for (let segment of this.segments) {
      centerOfMassArray.push({
        segment: segment,
        centerOfMass: this._centerOfMass(segment),
      });
    }
    centerOfMassArray.sort((a, b) => a.centerOfMass - b.centerOfMass);
    this.segments = centerOfMassArray.map((x) => x.segment);
    return centerOfMassArray;
  }
}

export default Segmentator;
