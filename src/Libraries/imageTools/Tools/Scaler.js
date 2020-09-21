/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Tool from "./Tool";
import Grid from "../Grid/Grid";

class Scaler extends Tool {
  // Decorator for grids, adding additional functionalities (scaling)

  _isCorner(x, y, position) {
    // Identifies if a field in a grid at the given position is a corner pixel
    const positionC = [
      Math.floor((position[0] - position[1]) / 2),
      Math.floor((position[0] + position[1]) / 2),
    ];
    const positionCC = [
      Math.floor((position[1] + position[0]) / 2),
      Math.floor((position[1] - position[0]) / 2),
    ];
    const xNextC = x + positionC[1];
    const yNextC = y + positionC[0];
    const xNextCC = x + positionCC[1];
    const yNextCC = y + positionCC[0];
    const shapeX = this.grid.xFields;
    const shapeY = this.grid.yFields;
    if (
      Math.abs(position[0]) === 1 &&
      Math.abs(position[1]) === 1 &&
      0 <= xNextC &&
      xNextC < shapeX &&
      0 <= yNextC &&
      yNextC < shapeY &&
      xNextCC < shapeX &&
      0 <= yNextCC &&
      yNextCC < shapeY
    ) {
      if (
        this.grid.getField(x, y).isFilled &&
        (this.grid.getField(xNextC, yNextC).isFilled ||
          this.grid.getField(xNextCC, yNextCC).isFilled)
      ) {
        return true;
      }
    }
    return false;
  }
  scale(xFields, yFields, scaleStroke = true) {
    // Scales a grid to fit the given position. If scaleStroke is set to false, it performs a
    // linear interpolation metho, if it is set to true, only the stroke is scaled, meaning that
    // each pixel will only be mapped once to the destination. Its position will be scaled but
    // it's thickness wont. Between non-corner filled pixels there will be a interpolated line
    // created to keep the stroke continuous.
    let scaledGrid = new Grid(xFields, yFields);
    if (scaleStroke) {
      const shapeX = this.grid.xFields;
      const shapeY = this.grid.yFields;
      const xFieldsAugmented =
        shapeX !== 1 ? Math.ceil(((xFields - 1) * shapeX) / (shapeX - 1)) : 0;
      const yFieldsAugmented =
        shapeY !== 1 ? Math.ceil(((yFields - 1) * shapeY) / (shapeY - 1)) : 0;
      const scalingX = xFieldsAugmented / shapeX;
      const scalingY = yFieldsAugmented / shapeY;
      for (let y = 0; y < shapeY; y++) {
        for (let x = 0; x < shapeX; x++) {
          if (this.grid.getField(x, y).isFilled) {
            const xScaled = Math.floor(x * scalingX);
            const yScaled = Math.floor(y * scalingY);
            scaledGrid.getField(xScaled, yScaled).isFilled = this.grid.getField(
              x,
              y
            ).isFilled;
            const positions = [
              [-1, 1],
              [0, 1],
              [1, 1],
              [1, 0],
              [-1, -1],
            ];
            for (let position of positions) {
              const xNext =
                0 <= x + position[1] && x + position[1] < shapeX
                  ? x + position[1]
                  : x;
              const yNext =
                0 <= y + position[0] && y + position[0] < shapeY
                  ? y + position[0]
                  : y;
              if (
                this.grid.getField(xNext, yNext).isFilled &&
                !this._isCorner(x, y, position)
              ) {
                const xScaledNext = Math.floor(xNext * scalingX);
                const yScaledNext = Math.floor(yNext * scalingY);
                const tMax = Math.max(
                  Math.abs(xScaledNext - xScaled),
                  Math.abs(yScaledNext - yScaled)
                );
                for (let t = 1; t < tMax; t++) {
                  const xP = Math.floor(
                    xScaled + (t / tMax) * (xScaledNext - xScaled)
                  );
                  const yP = Math.floor(
                    yScaled + (t / tMax) * (yScaledNext - yScaled)
                  );
                  scaledGrid.getField(xP, yP).isFilled = this.grid.getField(
                    x,
                    y
                  ).isFilled;
                }
              }
            }
          }
        }
      }
    } else {
      const scalingX = xFields / this.grid.xFields;
      const scalingY = yFields / this.grid.yFields;
      for (let field of this.grid.fields) {
        const xScaled = Math.floor(field.coordinate.x * scalingX);
        let xScaledNext = Math.floor((field.coordinate.x + 1) * scalingX);
        const yScaled = Math.floor(field.coordinate.y * scalingY);
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
    }
    return this.grid.replaceFields(scaledGrid);
  }
  fit(
    xFields,
    yFields,
    xMargin = 0,
    yMargin = 0,
    keepRatio = false,
    scaleStroke = true,
    initialWrap = true
  ) {
    // Fits the compound of filled fields on a grid to a grid of specified dimensions
    // with the given margins (eliminating original marnings if initialWrap === true) keeping the ratio of
    // the drawing (otherwise stretching the axes)
    if (2 * xMargin >= xFields || 2 * yMargin >= yFields) {
      return this.grid;
    }
    if (initialWrap) {
      this.grid.tools.cropper.wrap();
    }
    if (!keepRatio) {
      this.scale(xFields - 2 * xMargin, yFields - 2 * yMargin, scaleStroke);
      this.grid.tools.cropper.wrap(xMargin, yMargin);
      return this.grid;
    }
    const [xMin, xMax, yMin, yMax] = this.grid.tools.aligner.limits();
    const height = yMax - yMin + 1;
    const width = xMax - xMin + 1;
    const scaleRatio = height / width;
    console.log("********");
    console.log("xFields = " + xFields);
    console.log("yFields = " + yFields);
    console.log("scaleRatio = " + scaleRatio);
    console.log("height = " + height);
    console.log("width = " + width);

    if (scaleRatio > (yFields - 2 * yMargin) / (xFields - 2 * xMargin)) {
      this.scale(
        Math.ceil((yFields - 2 * yMargin) / scaleRatio),
        yFields - 2 * yMargin,
        scaleStroke
      );
    } else {
      this.scale(
        xFields - 2 * xMargin,
        Math.ceil((xFields - 2 * xMargin) * scaleRatio),
        scaleStroke
      );
    }
    this.grid.tools.cropper.crop(
      xFields - 2 * yMargin,
      yFields - 2 * yMargin,
      true
    );
    this.grid.tools.cropper.addMargins(xMargin, yMargin);
    return this.grid;
  }
  makeSquare() {
    // Adds margins to a drawing of any size such that its overall size has square proportions
    this.fit(
      Math.max(this.grid.xFields, this.grid.yFields),
      Math.max(this.grid.xFields, this.grid.yFields),
      0,
      0,
      true,
      false,
      true
    );
    return this.grid;
  }
}

export default Scaler;
