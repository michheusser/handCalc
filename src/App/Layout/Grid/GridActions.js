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
