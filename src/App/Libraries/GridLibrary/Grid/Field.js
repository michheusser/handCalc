/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Coordinate from "./Coordinate";

class Field {
  // Defines a filled/unfilled field within a grid
  constructor(coordinate = new Coordinate(0, 0), isFilled = false) {
    this._coordinate = coordinate;
    this.isFilled = isFilled;
  }
  set coordinate(coord) {
    console.log("Coordinate of a field cannot be changed!");
  }
  get coordinate() {
    return this._coordinate;
  }
  equal(field) {
    if (
      this.coordinate.equal(field.coordinate) &&
      this.isFilled === field.isFilled
    ) {
      return true;
    }
    return false;
  }
  toString() {
    // Displays field properties as text
    if (this.isFilled) {
      return `Field in: x = ${this.coordinate.x}, y = ${this.coordinate.y} (Filled)`;
    } else {
      return `Field in: x = ${this.coordinate.x}, y = ${this.coordinate.y} (Empty)`;
    }
  }
}
export default Field;
