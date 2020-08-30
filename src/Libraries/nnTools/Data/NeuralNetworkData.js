/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import NeuronLayerData from "./NeuronLayerData";

class NeuralNetworkData {
  // Contains the information of a neural network without dealing with the complex
  // object and its tools
  constructor() {
    this.layerData = [];
  }
  loadDataArray(data) {
    // Takes an object containing an array of inputWeight arrays corresponding to each layer,
    // and an array containing the bias corresponding to each layer and puts it in the
    // object as an array of objects containing neuronlayer objects
    this.layerData = new Array(data.inputWeights.length)
      .fill(null)
      .map((_, index) =>
        new NeuronLayerData().loadDataArray({
          inputWeights: data.inputWeights[index],
          bias: data.bias[index],
        })
      );
    return this;
  }
  getDataArray() {
    // returns an object containing an array of the 2D inputweight arrays and and array of the bias 1D arrays
    let inputWeights = [],
      bias = [];
    for (let i = 0; i < this.layerData.length; i++) {
      let layerData = this.layerData[i].getDataArray();
      inputWeights.push(layerData.inputWeights);
      bias.push(layerData.bias);
    }
    return { inputWeights: inputWeights, bias: bias };
  }
  [Symbol.iterator]() {
    // makes layers within the network iterable in for...of loops.
    let counter = 0;
    return {
      next: () => ({
        done: counter === this.layerData.length,
        value: this.layerData[counter++],
      }),
    }; // when done == true, value is not returned anymore
  }
}
export default NeuralNetworkData;
