const ActivationFunctions = Object.freeze({
  sigma: (x) => 1 / (1 + Math.exp(-x)),
});

export default ActivationFunctions;
