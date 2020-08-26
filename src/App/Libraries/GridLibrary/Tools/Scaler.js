import Tool from "./Tool";
import Grid from "../Grid/Grid";

class Scaler extends Tool {
  // Decorator for grids, adding additional functionalities (scaling)

  isCorner(x, y, position) {
    let positionC = [
      Math.floor((position[0] - position[1]) / 2),
      Math.floor((position[0] + position[1]) / 2),
    ];
    let positionCC = [
      Math.floor((position[1] + position[0]) / 2),
      Math.floor((position[1] - position[0]) / 2),
    ];
    let xNextC = x + positionC[1];
    let yNextC = y + positionC[0];
    let xNextCC = x + positionCC[1];
    let yNextCC = y + positionCC[0];
    let shapeX = this.grid.xFields;
    let shapeY = this.grid.yFields;
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
    let scaledGrid = new Grid(xFields, yFields);
    if (scaleStroke) {
      let shapeX = this.grid.xFields;
      let shapeY = this.grid.yFields;
      let xFieldsAugmented =
        shapeX !== 1 ? Math.ceil(((xFields - 1) * shapeX) / (shapeX - 1)) : 0;
      let yFieldsAugmented =
        shapeY !== 1 ? Math.ceil(((yFields - 1) * shapeY) / (shapeY - 1)) : 0;
      let scalingX = xFieldsAugmented / shapeX;
      let scalingY = yFieldsAugmented / shapeY;
      for (let y = 0; y < shapeY; y++) {
        for (let x = 0; x < shapeX; x++) {
          if (this.grid.getField(x, y).isFilled) {
            let xScaled = Math.floor(x * scalingX);
            let yScaled = Math.floor(y * scalingY);
            scaledGrid.getField(xScaled, yScaled).isFilled = this.grid.getField(
              x,
              y
            ).isFilled;
            let positions = [
              [-1, 1],
              [0, 1],
              [1, 1],
              [1, 0],
              [-1, -1],
            ];
            for (let position of positions) {
              let xNext =
                0 <= x + position[1] && x + position[1] < shapeX
                  ? x + position[1]
                  : x;
              let yNext =
                0 <= y + position[0] && y + position[0] < shapeY
                  ? y + position[0]
                  : y;
              if (
                this.grid.getField(xNext, yNext).isFilled &&
                !this.isCorner(x, y, position)
              ) {
                let xScaledNext = Math.floor(xNext * scalingX);
                let yScaledNext = Math.floor(yNext * scalingY);
                let tMax = Math.max(
                  Math.abs(xScaledNext - xScaled),
                  Math.abs(yScaledNext - yScaled)
                );
                for (let t = 1; t < tMax; t++) {
                  let xP = Math.floor(
                    xScaled + (t / tMax) * (xScaledNext - xScaled)
                  );
                  let yP = Math.floor(
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
    let [xMin, xMax, yMin, yMax] = this.grid.tools.aligner.limits();
    let height = yMax - yMin + 1;
    let width = xMax - xMin + 1;
    let scaleRatio = height / width;
    if (scaleRatio > (yFields - 2 * yMargin) / (xFields - 2 * xMargin)) {
      this.scale(
        Math.floor((yFields - 2 * yMargin) / scaleRatio),
        yFields - 2 * yMargin,
        scaleStroke
      );
    } else {
      this.scale(
        xFields - 2 * xMargin,
        Math.floor((xFields - 2 * xMargin) * scaleRatio),
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
