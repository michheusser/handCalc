export const processGrid = (xFields, yFields, activeFields) => {
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields, activeFields: activeFields },
  };
};
