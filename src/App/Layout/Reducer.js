/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** FUNCTIONS ****************************
function newFieldGrid(xFields, yFields) {
  // Creates a 2D array of booleans set to false with the dimensions given
  return new Array(xFields)
    .fill(null)
    .map((_) => new Array(yFields).fill(false));
}

function copyFields(oldFields, newFields) {
  // Copies as many fields possible from a 2D array of booleans called oldFields to
  // newFields. If both have the same dimensions they will be identical
  const xFieldsMin = Math.min(oldFields.length, newFields.length);
  const yFieldsMin = Math.min(oldFields[0].length, newFields[0].length);
  for (let x = 0; x < xFieldsMin; x++) {
    for (let y = 0; y < yFieldsMin; y++) {
      newFields[x][y] = oldFields[x][y];
    }
  }
}

function areEmpty(fields, width, height) {
  // Takes a 2D array of booleans and returns true if all fields are set to false (empty)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (fields[x][y]) {
        return false;
      }
    }
  }
  return true;
}

const calculateDimensions = (width, height, shortFields, border) => {
  // Calculates dimensions of the grid depending on the size of the window. It ensures
  // that the shortest of the axes contains a certain amount of pixels to be able to draw
  const shortAxis = width < height ? width : height;
  const fieldSize = Math.floor(
    (shortAxis - shortFields * border) / shortFields
  );
  const heightFields = Math.floor(height / (fieldSize + border));
  const widthFields = Math.floor(width / (fieldSize + border));
  const marginLeft = Math.floor(
    (width - (widthFields * (fieldSize + border) + border)) / 2
  );
  const marginTop = Math.floor(
    (height - (heightFields * (fieldSize + border) + border)) / 2
  );
  return [widthFields, heightFields, fieldSize, marginLeft, marginTop];
};

// **************************** REDUCER ****************************
let layoutReducer = (state, action) => {
  // Is in charge of the layout of the drawing board, which includes a dynamic generation of
  // the amount of pixels on it depending on the window size, as well as any drawings on it
  if (typeof state === "undefined" || action.type === "CLEAR_GRID") {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fieldBorder = 1;
    const shortFields = 60;
    // Calculates the dimensions
    const [
      widthFields,
      heightFields,
      fieldSize,
      marginLeft,
      marginTop,
    ] = calculateDimensions(width, height, shortFields, fieldBorder);

    // Generates new grid
    const fields = newFieldGrid(widthFields, heightFields);

    // Sets the new state
    const newState = {
      width: width,
      height: height,
      widthFields: widthFields,
      heightFields: heightFields,
      fieldSize: fieldSize,
      fieldBorder: fieldBorder,
      shortFields: shortFields,
      marginLeft: marginLeft,
      marginTop: marginTop,
      fields: fields,
      emptyGrid: true,
    };

    return newState;
  }

  if (action.type === "RESIZE_WINDOW") {
    const width = action.payload.width;
    const height = action.payload.height;
    const fieldBorder = state.fieldBorder;
    const shortFields = state.shortFields;

    //Calculates dimensions
    const [
      widthFields,
      heightFields,
      fieldSize,
      marginLeft,
      marginTop,
    ] = calculateDimensions(width, height, shortFields, fieldBorder);

    // Creates new grid
    const fields = newFieldGrid(widthFields, heightFields);
    copyFields(state.fields, fields);

    // Checks if grid is empty
    const emptyGrid = areEmpty(fields, widthFields, heightFields);

    const newState = {
      width: width,
      height: height,
      widthFields: widthFields,
      heightFields: heightFields,
      fieldSize: fieldSize,
      fieldBorder: fieldBorder,
      shortFields: shortFields,
      marginLeft: marginLeft,
      marginTop: marginTop,
      fields: fields,
      emptyGrid: emptyGrid,
    };

    return newState;
  }
  if (action.type === "CHANGE_FIELD") {
    // Creates new grid
    let fields = newFieldGrid(state.widthFields, state.heightFields);

    // Changes the field in the grid
    for (let x = 0; x < state.widthFields; x++) {
      fields[x] = [...state.fields[x]];
    }
    fields[action.payload.x][action.payload.y] = action.payload.isFilled;
    let emptyGrid = false;

    // If the new changed field is filled, means the grid is not empty
    if (!action.payload.isFilled) {
      emptyGrid = areEmpty(fields, state.widthFields, state.heightFields);
    }

    // Sets the new state
    const newState = {
      ...state,
      fields: fields,
      emptyGrid: emptyGrid,
    };
    return newState;
  }

  return state;
};

export default layoutReducer;
