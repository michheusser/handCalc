/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Grid from "./Grid/Grid";
import Cloner from "./Tools/Cloner";
import Aligner from "./Tools/Aligner";
import Cropper from "./Tools/Cropper";
import Scaler from "./Tools/Scaler";
import Segmentator from "./Tools/Segmentator";
import Manipulator from "./Tools/Manipulator";

class Generator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new Cloner(),
      new Aligner(),
      new Cropper(),
      new Scaler(),
      new Segmentator(),
      new Manipulator()
    );
    return this;
  }
  addTools(grid) {
    //let counter = 0;
    for (let tool of this.tools) {
      grid.addTool(tool);
      //  counter++;
    }

    return grid;
  }
  fillFields(grid, fields) {
    for (let field of fields) {
      grid.fill(field[0], field[1]);
    }
  }
  createGrid(xFields, yFields, fields = []) {
    let newGrid = new Grid(xFields, yFields);
    this.loadTools().addTools(newGrid);
    this.fillFields(newGrid, fields);

    return newGrid;
  }
}

export default Generator;
