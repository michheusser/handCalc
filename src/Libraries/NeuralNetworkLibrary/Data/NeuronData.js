/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

class NeuronData {
  // Contains the numerical data of a neuron, which includes its input weights and
  // bias'
  constructor() {
    this.inputWeights = [];
    this.bias = [];
  }
  loadDataArray(data) {
    // loads neuron data info, which is comprised of one object with the first element being
    // the inputWeights array and the second, the bias array into the two separate arrays
    // of the object properties
    this.inputWeights = new Array(data.inputWeights.length)
      .fill(null)
      .map((_, index) => data.inputWeights[index]);
    this.bias = data.bias;
    return this;
  }
  getDataArray() {
    // returns an object with the inputWeights array as one entry and the bias array
    // as the second input
    return { inputWeights: this.inputWeights, bias: this.bias };
  }
}
export default NeuronData;
