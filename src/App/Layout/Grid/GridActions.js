export const processGrid = (xFields, yFields, fields) => {
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields, fields: fields },
  };
};

export const finishedProcess = () => {
  return {
    type: "PROCESS_FINISHED",
    payload: {},
  };
};

export const openPane = () => {
  return {
    type: "OPEN_PANE",
    payload: {},
  };
};

export const closePane = () => {
  return {
    type: "CLOSE_PANE",
    payload: {},
  };
};

export const mouseDown = () => {
  return {
    type: "GRID_MOUSE_DOWN",
    payload: {},
  };
};

export const mouseUp = () => {
  return {
    type: "GRID_MOUSE_UP",
    payload: {},
  };
};
