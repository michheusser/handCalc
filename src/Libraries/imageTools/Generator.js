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
  // Main API tool for creating grids. Since grids need to be initiated and their tools added this
  // is the preferred way of dealing with grids
  constructor() {
    this.tools = [];
  }
  createGrid(xFields, yFields, fields = []) {
    // Creates and initializates a grid object with all its tools
    let newGrid = new Grid(xFields, yFields);
    this._loadTools()._addTools(newGrid);
    this._fillFields(newGrid, fields);

    return newGrid;
  }
  _loadTools() {
    // Loads all the necessary tools to the generator object
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
  _addTools(grid) {
    // Adds the tools of the object to the grid object and connects them accordingly
    for (let tool of this.tools) {
      grid.addTool(tool);
    }

    return grid;
  }
  _fillFields(grid, fields) {
    // fils the grid fields with the active fields given during the creation of the grid
    for (let field of fields) {
      grid.fill(field[0], field[1]);
    }
  }
}

export default Generator;
