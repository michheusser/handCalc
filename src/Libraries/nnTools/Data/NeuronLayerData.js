/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import NeuronData from "./NeuronData";

class NeuronLayerData {
  // Contains an array of neuron data objects
  constructor() {
    this.neuronData = [];
  }
  loadDataArray(data) {
    // Takes an object containing an array of inputWeight arrays corresponding to each neuron,
    // and an array containing the bias corresponding to each neuron and puts it in the
    // object as an array of objects containing neurondata objects
    this.neuronData = new Array(data.inputWeights.length)
      .fill(null)
      .map((_, index) =>
        new NeuronData().loadDataArray({
          inputWeights: data.inputWeights[index],
          bias: data.bias[index],
        })
      );
    return this;
  }
  getDataArray() {
    // returns an object containing an array of the inputweight arrays and and array of the bias
    let inputWeights = [],
      bias = [];
    for (let i = 0; i < this.neuronData.length; i++) {
      let neuronData = this.neuronData[i].getDataArray();
      inputWeights.push(neuronData.inputWeights);
      bias.push(neuronData.bias);
    }
    return { inputWeights: inputWeights, bias: bias };
  }

  [Symbol.iterator]() {
    // makes neurons within the layer iterable in for...of loops.
    let counter = 0;
    return {
      next: () => ({
        done: counter === this.neuronData.length,
        value: this.neuronData[counter++],
      }),
    };
  }
}
export default NeuronLayerData;
