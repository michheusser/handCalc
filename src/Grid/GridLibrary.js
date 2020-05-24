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
  toString() {
    return `Coordinate: x = ${this._x}, y = ${this._y}`;
  }
}
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
  toString() {
    // Displays field properties as text
    if (this.isFilled) {
      return `Field in: x = ${this.coordinate.x}, y = ${this.coordinate.y} (Filled)`;
    } else {
      return `Field in: x = ${this.coordinate.x}, y = ${this.coordinate.y} (Empty)`;
    }
  }
}
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
  addTool(gridTool) {
    if (gridTool.__proto__.__proto__.constructor.name !== "GridTool") {
      console.log("Uncompatible. No tool was added.");
      return this;
    }
    gridTool.grid = this;
    this.tools[gridTool.name] = gridTool;
    //console.log(`Tool added! Name: ${gridTool.name}, Type: ${gridTool.__proto__.constructor.name}`);
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
class GridTool {
  // Abstract class for tools that operate on a grid. Per default, it always keeps a copy of the original grid.
  constructor() {
    this.grid = null;
    this.name =
      this.__proto__.constructor.name.charAt(0).toLowerCase() +
      this.__proto__.constructor.name.substring(1);
  }
}
class GridCloner extends GridTool {
  clone() {
    let clonedGrid = new GridGenerator().createGrid(
      this.grid.xFields,
      this.grid.yFields
    );
    for (let i = 0; i < clonedGrid.fields.length; i++) {
      clonedGrid.fields[i].isFilled = this.grid.fields[i].isFilled;
    }
    return clonedGrid;
  }
}
class GridAligner extends GridTool {
  // Decorator for grids, adding additional functionalities (aligning / centering)
  limits() {
    let xMin = this.grid.xFields - 1;
    let xMax = 0;
    let yMin = this.grid.yFields - 1;
    let yMax = 0;
    for (let field of this.grid.fields) {
      if (field.isFilled && field.coordinate.x < xMin) {
        xMin = field.coordinate.x;
      }
      if (field.isFilled && field.coordinate.x > xMax) {
        xMax = field.coordinate.x;
      }
      if (field.isFilled && field.coordinate.y < yMin) {
        yMin = field.coordinate.y;
      }
      if (field.isFilled && field.coordinate.y > yMax) {
        yMax = field.coordinate.y;
      }
    }
    return [xMin, xMax, yMin, yMax];
  }
  shift(xOffset, yOffset) {
    if (xOffset === 0 && yOffset === 0) {
      return this.grid;
    }
    let tempGrid = this.grid.tools.gridCloner.clone();
    for (let field of this.grid.fields) {
      let tempField = tempGrid.getField(
        field.coordinate.x - xOffset,
        field.coordinate.y - yOffset
      );
      if (tempField === null) {
        field.isFilled = false;
      } else {
        field.isFilled = tempField.isFilled;
      }
    }
    return this.grid;
  }
  align() {
    // Shifts all fields to be aligned on the horizontal and vertical axis
    let [xMin, xMax, yMin, yMax] = this.limits();
    let xMargin = Math.ceil((this.grid.xFields - (xMax - xMin + 1)) / 2);
    let yMargin = Math.ceil((this.grid.yFields - (yMax - yMin + 1)) / 2);
    this.shift(-xMin + xMargin, -yMin + yMargin);
    return this.grid;
  }
}
class GridCropper extends GridTool {
  // Decorator for grids, adding additional functionalities (cropping)
  crop(
    xFields,
    yFields,
    align = false // crops grid to a new grid of the given dimension. If the dimensions are bigger, new empty fields are added.
  ) {
    if (xFields < 1) {
      xFields = 1;
    }
    if (yFields < 1) {
      yFields = 1;
    }
    let croppedGrid = new Grid(xFields, yFields);
    for (let field of croppedGrid.fields) {
      let fieldToCopy = this.grid.getField(
        field.coordinate.x,
        field.coordinate.y
      );
      if (fieldToCopy === null) {
        field.isFilled = false;
      } else {
        field.isFilled = fieldToCopy.isFilled;
      }
    }
    this.grid.replaceFields(croppedGrid);
    if (align) {
      this.grid.tools.gridAligner.align();
    }
    return this.grid;
  }
  addMargins(xMargin = 0, yMargin = 0) {
    if (xMargin < 0 || yMargin < 0) {
      return this;
    }
    this.grid.tools.gridCropper.crop(
      this.grid.xFields + 2 * xMargin,
      this.grid.yFields + 2 * yMargin
    );
    this.grid.tools.gridAligner.shift(xMargin, yMargin);
    return this.grid;
  }
  wrap(
    xMargin = 0,
    yMargin = 0 // crops from both sides to the smallest possible grid with margins (if selected the smalles possible square grid).
  ) {
    let [xMin, xMax, yMin, yMax] = this.grid.tools.gridAligner.limits();
    let height = yMax - yMin + 1;
    let width = xMax - xMin + 1;
    this.grid.tools.gridAligner.shift(-xMin, -yMin);
    this.grid.tools.gridCropper.crop(width + 2 * xMargin, height + 2 * yMargin);
    this.grid.tools.gridAligner.shift(xMargin, yMargin);
    return this.grid;
  }
}
class GridScaler extends GridTool {
  // Decorator for grids, adding additional functionalities (scaling)
  scale(xFields, yFields) {
    let scaledGrid = new Grid(xFields, yFields);
    let scalingX = xFields / this.grid.xFields;
    let scalingY = yFields / this.grid.yFields;
    for (let field of this.grid.fields) {
      let xScaled = Math.floor(field.coordinate.x * scalingX);
      let xScaledNext = Math.floor((field.coordinate.x + 1) * scalingX);
      let yScaled = Math.floor(field.coordinate.y * scalingY);
      let yScaledNext = Math.floor((field.coordinate.y + 1) * scalingY);
      if (xScaledNext >= xFields) {
        xScaledNext = xFields;
      }
      if (yScaledNext >= yFields) {
        yScaledNext = yFields;
      }
      for (let x = xScaled; x < xScaledNext; x++) {
        for (let y = yScaled; y < yScaledNext; y++) {
          scaledGrid.getField(x, y).isFilled = field.isFilled;
        }
      }
    }
    return this.grid.replaceFields(scaledGrid);
  }
  fit(xFields, yFields, xMargin = 0, yMargin = 0, keepRatio = false) {
    if (2 * xMargin >= xFields || 2 * yMargin >= yFields) {
      return this.grid;
    }
    this.grid.tools.gridCropper.wrap();
    if (!keepRatio) {
      this.scale(xFields - 2 * xMargin, yFields - 2 * yMargin);
      this.grid.tools.gridCropper.wrap(xMargin, yMargin);
      return this.grid;
    }
    let [xMin, xMax, yMin, yMax] = this.grid.tools.gridAligner.limits();
    let height = yMax - yMin + 1;
    let width = xMax - xMin + 1;
    let scaleRatio = height / width;
    if (scaleRatio > (yFields - 2 * yMargin) / (xFields - 2 * xMargin)) {
      this.scale(
        Math.floor((yFields - 2 * yMargin) / scaleRatio),
        yFields - 2 * yMargin
      );
    } else {
      this.scale(
        xFields - 2 * xMargin,
        Math.floor((xFields - 2 * xMargin) * scaleRatio)
      );
    }
    this.grid.tools.gridCropper.crop(
      xFields - 2 * yMargin,
      yFields - 2 * yMargin,
      true
    );
    this.grid.tools.gridCropper.addMargins(xMargin, yMargin);
    return this.grid;
  }
}
class GridSegmentator extends GridTool {
  // Takes a grid as an input and creates grids of equal size containing each agglomeration of filled fields
  constructor() {
    super();
    this.segments = [];
  }
  clearSegments() {
    this.segments = [];
    return this.grid;
  }
  agglomerate(
    grid,
    gridSegment,
    x,
    y // Recursive algorithm to agglomerate fields with touching fields. It takes the agglomerated points from grid to segment grid and empties the fields in the original grid
  ) {
    if (grid.getField(x, y) === null || !grid.getField(x, y).isFilled) {
      return null;
    }
    gridSegment.fill(x, y);
    grid.clear(x, y);
    let positions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let position of positions) {
      this.agglomerate(grid, gridSegment, x + position[0], y + position[1]);
    }
    return true;
  }
  createSegments() {
    // Segments the grid and allocates the segments in this segments.
    this.clearSegments();
    let grid = this.grid.tools.gridCloner.clone(); // creates clone of original grid
    for (let y = 0; y < grid.yFields; y++) {
      for (let x = 0; x < grid.xFields; x++) {
        if (grid.getField(x, y).isFilled) {
          let gridSegment = new Grid(grid.xFields, grid.yFields);
          this.agglomerate(grid, gridSegment, x, y);
          this.segments.push(gridSegment);
        }
      }
    }
    return this.grid;
  }
  fitSegments(xFields, yFields, xMargin = 0, yMargin = 0, keepRatio = false) {
    for (let segment of this.segments) {
      segment
        .addTool(new GridCloner())
        .addTool(new GridAligner())
        .addTool(new GridCropper())
        .addTool(new GridScaler())
        .addTool(new GridSegmentator());
      segment.tools.gridScaler.fit(
        xFields,
        yFields,
        xMargin,
        yMargin,
        keepRatio
      );
    }
    return this.grid;
  }
}
class GridGenerator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new GridCloner(),
      new GridAligner(),
      new GridCropper(),
      new GridScaler(),
      new GridSegmentator()
    );
    return this;
  }
  addTools(grid) {
    let counter = 0;
    for (let tool of this.tools) {
      grid.addTool(tool);
      counter++;
    }
    console.log(`${counter} tools successfully added. `);
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
    console.log("New Grid created.");
    return newGrid;
  }
}

export default GridGenerator;
