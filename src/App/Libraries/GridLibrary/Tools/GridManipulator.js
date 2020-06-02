import GridTool from "./GridTool";

class GridManipulator extends GridTool {
  gridToArray() {
    const array = [];
    for (let y = 0; y < this.grid.yFields; y++) {
      for (let x = 0; x < this.grid.xFields; x++) {
        array.push(+this.grid.getField(x, y).isFilled);
      }
    }
    return array;
  }
}

export default GridManipulator;
