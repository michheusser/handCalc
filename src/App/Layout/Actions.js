/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

export const windowResize = (innerWidth, innerHeight) => {
  return {
    type: "RESIZE_WINDOW",
    payload: { width: innerWidth, height: innerHeight },
  };
};
