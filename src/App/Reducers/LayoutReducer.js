let layoutReducer = (state, action) => {
  if (typeof state === "undefined") {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fieldBorder = 1;
    let longFields = 100;
    let [widthFields, heightFields, fieldSize] = calculateDimensions(
      width,
      height,
      longFields,
      fieldBorder
    );

    let newState = {
      width: width,
      height: height,
      widthFields: widthFields,
      heightFields: heightFields,
      fieldSize: fieldSize,
      fieldBorder: fieldBorder,
      longFields: longFields,
    };
    return newState;
  }

  if (action.type === "RESIZE_WINDOW") {
    let width = action.payload.width;
    let height = action.payload.height;
    let fieldBorder = state.fieldBorder;
    let longFields = state.longFields;
    let [widthFields, heightFields, fieldSize] = calculateDimensions(
      width,
      height,
      longFields,
      fieldBorder
    );

    let newState = {
      width: width,
      height: height,
      widthFields: widthFields,
      heightFields: heightFields,
      fieldSize: fieldSize,
      fieldBorder: fieldBorder,
      longFields: longFields,
    };
    return newState;
  }
  return state;
};

let calculateDimensions = (width, height, longFields, border) => {
  if (width > height) {
    let widthFields = longFields;
    let fieldSize = Math.floor((width - widthFields * border) / widthFields);
    let heightFields = Math.floor(height / (fieldSize + border));
    return [widthFields, heightFields, fieldSize];
  } else {
    let heightFields = longFields;
    let fieldSize = Math.floor((height - heightFields * border) / heightFields);
    let widthFields = Math.floor(width / (fieldSize + border));
    return [widthFields, heightFields, fieldSize];
  }
};

export default layoutReducer;
