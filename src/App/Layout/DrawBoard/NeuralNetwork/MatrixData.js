/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import weights from "./SavedNetwork/weights.json";
import bias from "./SavedNetwork/bias.json";

const neuralNetworkMatrixData = Object.freeze({
  inputWeights: weights,
  bias: bias,
});

export default neuralNetworkMatrixData;
