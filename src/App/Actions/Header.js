/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const processGrid = (xFields, yFields, fields) => {
  return {
    type: "PROCESS_GRID",
    payload: { xFields: xFields, yFields: yFields, fields: fields },
  };
};
