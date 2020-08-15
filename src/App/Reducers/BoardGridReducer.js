let boardGridReducer = (state, action) => {
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

export default boardGridReducer;
