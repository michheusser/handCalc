class Coordinate {
  // Defines a coordinate within a specified environment (e.g. Grid)
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  set x(
    xNew // Protect x from being changed
  ) {
    console.log("x coordinate cannot be changed!");
  }
  get x() {
    return this._x;
  }
  set y(
    yNew // Protect y from being changed
  ) {
    console.log("y coordinate cannot be changed!");
  }
  get y() {
    return this._y;
  }
  equal(coordinate) {
    if (this.x === coordinate.x && this.y === coordinate.y) {
      return true;
    }
    return false;
  }
  toString() {
    return `Coordinate: x = ${this._x}, y = ${this._y}`;
  }
}

export default Coordinate;
