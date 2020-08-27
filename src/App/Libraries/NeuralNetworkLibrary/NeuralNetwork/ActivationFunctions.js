/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

const ActivationFunctions = Object.freeze({
  sigma: (x) => 1 / (1 + Math.exp(-x)),
});

export default ActivationFunctions;
