/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const changeField = (x, y, isFilled) => {
  return {
    type: "CHANGE_FIELD",
    payload: { x: x, y: y, isFilled: isFilled },
  };
};
