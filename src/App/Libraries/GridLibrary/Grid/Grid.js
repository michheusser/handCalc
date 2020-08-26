import Coordinate from "./Coordinate";
import Field from "./Field";

class Grid {
  // Contains the amount of fields that its dimensions (x,y) define
  constructor(xFields = 1, yFields = 1) {
    this.xFields = xFields;
    this.yFields = yFields;
    this.fields = (function (xF, yF) {
      // Fills grid with fields (xFields * yFields fields) using zero-based coordinates
      let fields = [];
      for (let y = 0; y < yF; y++) {
        for (let x = 0; x < xF; x++) {
          fields.push(new Field(new Coordinate(x, y)));
        }
      }
      return fields;
    })(this.xFields, this.yFields);
    this.tools = {};
  }
  getField(x, y) {
    for (let field of this.fields) {
      if (field.coordinate.x === x && field.coordinate.y === y) {
        return field;
      }
    }
    return null;
    /*if(y*this.xFields + x < this.fields.length){
      let field = this.fields[y*this.xFields + x];
      if(field.coordinate.x === x && field.coordinate.y === y){return field;}
    }
    return null;*/
  }
  fill(
    x,
    y // fills the field with given coordinates (field.isFilled = true). returns true if anything was changed, false otherwise
  ) {
    let field = this.getField(x, y);
    if (field !== null) {
      if (!field.isFilled) {
        field.isFilled = true;
      }
    }
    return this;
  }
  clear(
    x,
    y // clears the field with given coordinates (field.isFilled = false). returns true if anything was changed, false otherwise
  ) {
    let field = this.getField(x, y);
    if (field != null) {
      if (field.isFilled) {
        field.isFilled = false;
      }
    }
    return this;
  }
  toggle(
    x,
    y // toggles the field with given coordinates (field.isFilled toggled to false/true). returns true if anything was changed, false otherwise (i.e. no field found with those coordinates)
  ) {
    let field = this.getField(x, y);
    if (field !== null) {
      field.isFilled = !field.isFilled;
    }
    return this;
  }
  addTool(tool) {
    if (tool.__proto__.__proto__.constructor.name !== "Tool") {
      console.log("Uncompatible. No tool was added.");
      return this;
    }
    tool.grid = this;
    this.tools[tool.name] = tool;
    //console.log(`Tool added! Name: ${tool.name}, Type: ${tool.__proto__.constructor.name}`);
    return this;
  }
  replaceFields(grid) {
    this.xFields = grid.xFields;
    this.yFields = grid.yFields;
    this.fields = [];
    for (let newField of grid.fields) {
      this.fields.push(
        new Field(
          new Coordinate(newField.coordinate.x, newField.coordinate.y),
          newField.isFilled
        )
      );
    }
    return this;
  }
  getFilledFields() {
    let filledFields = [];
    for (let field of this.fields) {
      if (field.isFilled) {
        filledFields.push(field);
      }
    }
    return filledFields;
  }
  /*equalFilledFields(grid) {
    if (this.xFields === grid.xFields && this.yFields === grid.yFields) {
      const filledFields = this.getFilledFields();
      const newFilledFields = newGrid.getFilledFields();
      const equalGrids = true;
      if (filledFields.length === newFilledFields.length) {
        for (let i = 0; i < filledFields.length; i++) {
          if (!filledFields[i].equal(newFilledFields[i])) {
            break;
          }
        }
      }
    }
    return false;
  }*/
  toString() {
    // Displays grid as text (empty fields as 0's filled fields as 1's)
    let text = `Grid: width = ${this.xFields}, height = ${this.yFields}\n`;
    for (let y = 0; y < this.yFields; y++) {
      let line = [];
      for (let x = 0; x < this.xFields; x++) {
        line.push(+this.fields[y * this.xFields + x].isFilled);
      }
      text += line.join("") + "\n";
    }
    return text;
  }
}
export default Grid;
