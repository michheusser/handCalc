export const processGrid = (xFields, yFields, fields) => {
  console.log("[processGrid] PROCESS_GRID");
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields, fields: fields },
  };
};

export const finishedProcess = () => {
  console.log("[processGrid] PROCESS_FINISHED");
  return {
    type: "PROCESS_FINISHED",
    payload: {},
  };
};
