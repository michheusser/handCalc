/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Tool from "./Tool";
import Generator from "../Generator";

class Cloner extends Tool {
  clone() {
    let clonedGrid = new Generator().createGrid(
      this.grid.xFields,
      this.grid.yFields
    );
    for (let i = 0; i < clonedGrid.fields.length; i++) {
      clonedGrid.fields[i].isFilled = this.grid.fields[i].isFilled;
    }
    return clonedGrid;
  }
}

export default Cloner;
