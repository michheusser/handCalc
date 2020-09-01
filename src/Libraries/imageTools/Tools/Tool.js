/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

class Tool {
  // Abstract class for tools that operate on a grid. Per default, it always keeps a
  //copy of the original grid.
  constructor() {
    this.grid = null;
  }
}
export default Tool;
