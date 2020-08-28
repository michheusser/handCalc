/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Tool from "./Tool";

class Manipulator extends Tool {
  // Contains diverse methods of manipulating the grid's data
  gridToArray() {
    // Creates a 1D array with all the isFilled values of the grid
    const array = [];
    for (let y = 0; y < this.grid.yFields; y++) {
      for (let x = 0; x < this.grid.xFields; x++) {
        array.push(+this.grid.getField(x, y).isFilled);
      }
    }
    return array;
  }
  gridToImage(color) {
    // Creates an image data to be read by a canvas HTML element out of the grid
    let imageArray = new Uint8ClampedArray(
      this.grid.xFields * this.grid.yFields * 4
    ).fill(255);
    for (let i = 0; i < Math.floor(imageArray.length / 4); i++) {
      if (this.grid.fields[i].isFilled) {
        imageArray[4 * i + 0] = color.r;
        imageArray[4 * i + 1] = color.g;
        imageArray[4 * i + 2] = color.b;
      }
    }
    return new ImageData(imageArray, this.grid.xFields, this.grid.yFields);
  }
}

export default Manipulator;
