/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** ACTIONS ****************************
export const windowResize = (innerWidth, innerHeight) => {
  // Dispatches the action to update the layout reducer according to the nex window size
  return {
    type: "RESIZE_WINDOW",
    payload: { width: innerWidth, height: innerHeight },
  };
};
