export const processGrid = (xFields, yFields) => {
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields },
  };
};
