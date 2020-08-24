let gridLayoutReducer = (state, action) => {
  if (typeof state === "undefined") {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fieldBorder = 1;
    const shortFields = 60;
    const [
      widthFields,
      heightFields,
      fieldSize,
      marginLeft,
      marginTop,
    ] = calculateDimensions(width, height, shortFields, fieldBorder);
    const fields = newFieldGrid(widthFields, heightFields);

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
    };

    return newState;
  }

  if (action.type === "RESIZE_WINDOW") {
    const width = action.payload.width;
    const height = action.payload.height;
    const fieldBorder = state.fieldBorder;
    const shortFields = state.shortFields;
    const [
      widthFields,
      heightFields,
      fieldSize,
      marginLeft,
      marginTop,
    ] = calculateDimensions(width, height, shortFields, fieldBorder);

    let fields = newFieldGrid(widthFields, heightFields);
    copyFields(state.fields, fields);

    /*for (let x = 0; x < Math.min(widthFields, state.widthFields); x++) {
      for (let y = 0; y < Math.min(heightFields, state.heightFields); y++) {
        fields[x][y] = state.fields[x][y];
      }
    }*/
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
    };

    return newState;
  }
  if (action.type === "CHANGE_FIELD") {
    let fields = newFieldGrid(state.widthFields, state.heightFields);
    for (let x = 0; x < state.widthFields; x++) {
      fields[x] = [...state.fields[x]];
    }
    fields[action.payload.x][action.payload.y] = action.payload.isFilled;
    const newState = {
      ...state,
      fields: fields,
    };

    return newState;
  }

  return state;
};

const calculateDimensions = (width, height, shortFields, border) => {
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

export default gridLayoutReducer;

function newFieldGrid(xFields, yFields) {
  return new Array(xFields)
    .fill(null)
    .map((_) => new Array(yFields).fill(false));
}

function copyFields(oldFields, newFields) {
  const xFieldsMin = Math.min(oldFields.length, newFields.length);
  const yFieldsMin = Math.min(oldFields[0].length, newFields[0].length);
  for (let x = 0; x < xFieldsMin; x++) {
    for (let y = 0; y < yFieldsMin; y++) {
      newFields[x][y] = oldFields[x][y];
    }
  }
}
