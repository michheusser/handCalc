/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

class Coordinate {
  // Defines a coordinate within a specified environment (e.g. Grid)
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  set x(
    // Protect x from being changed
    xNew
  ) {
    console.log("x coordinate cannot be changed!");
  }
  get x() {
    // Getter for x
    return this._x;
  }
  set y(
    // Protect y from being changed
    yNew
  ) {
    console.log("y coordinate cannot be changed!");
  }
  get y() {
    // Getter for y
    return this._y;
  }
  equal(coordinate) {
    // compares two coordinates and returns true if their coordinates are equal
    if (this.x === coordinate.x && this.y === coordinate.y) {
      return true;
    }
    return false;
  }
  toString() {
    // Returns the string representation
    return `Coordinate: x = ${this._x}, y = ${this._y}`;
  }
}

export default Coordinate;
