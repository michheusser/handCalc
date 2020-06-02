import ActivationFunctions from "./ActivationFunctions";
import NeuronConnection from "./NeuronConnection";
import NeuronData from "../Data/NeuronData";

class Neuron {
  constructor(
    bias = null,
    activation = null,
    activationFunction = ActivationFunctions.sigma
  ) {
    this.inputs = [];
    this.outputs = [];
    this.bias = bias;
    this.activation = activation;
    this.activationFunction = activationFunction;
  }
  connectInput(backNeuron, weight = null) {
    let newConnection = new NeuronConnection(backNeuron, this, weight);
    this.inputs.push(newConnection);
    backNeuron.outputs.push(newConnection);
    return this;
  }
  initialize(value = null) {
    if (value === null) {
      this.bias = Math.random() * 2 - 1;
      for (let input of this.inputs) {
        input.weight = Math.random() * 2 - 1;
      }
    } else {
      this.bias = value;
      for (let input of this.inputs) {
        input.weight = value;
      }
    }
    return this;
  }
  loadActivation(activation) {
    this.activation = activation;
  }
  getActivation() {
    return this.activation;
  }
  activate() {
    if (this.inputs.length === 0) {
      return this;
    }
    let activation = 0;
    for (let i = 0; i < this.inputs.length; i++) {
      activation += this.inputs[i].weight * this.inputs[i].back.activation;
    }
    activation += this.bias;
    this.activation = this.activationFunction(activation);
    return this;
  }
  getData() {
    let neuronData = new NeuronData();
    neuronData.bias = this.bias;
    for (let input of this.inputs) {
      neuronData.inputWeights.push(input.weight);
    }
    return neuronData;
  }
  loadData(neuronData = null) {
    if (neuronData === null) {
      return this;
    }
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].weight = neuronData.inputWeights[i];
    }
    this.bias = neuronData.bias;
    //console.log("Neuron Data loaded.");
    return this;
  }
  toString() {
    return `Neuron: inputs = ${this.inputs.length}, outputs = ${this.outputs.length}, bias = ${this.bias}`;
    // Todo
  }
  [Symbol.iterator]() {
    // makes single neurons compatible for iterated neuron layer operations
    let end = false;
    return { next: () => ({ value: this, done: end++ }) };
  }
}
export default Neuron;
