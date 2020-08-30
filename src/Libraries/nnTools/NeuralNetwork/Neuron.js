/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import ActivationFunctions from "./ActivationFunctions";
import NeuronConnection from "./NeuronConnection";
import NeuronData from "../Data/NeuronData";

class Neuron {
  // Contains the values and methods of a neuron in the context of a neural network.
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
  [Symbol.iterator]() {
    // makes single neurons compatible for iterated neuron layer operations
    let end = false;
    return { next: () => ({ value: this, done: end++ }) };
  }
  connectInput(backNeuron, weight = null) {
    // Conneccts two neurons and creats a connection object between them that contains the
    // input weight between both
    let newConnection = new NeuronConnection(backNeuron, this, weight);
    this.inputs.push(newConnection);
    backNeuron.outputs.push(newConnection);
    return this;
  }
  initialize(value = null) {
    // Initializes the neuron with random values or a specific value
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
    // loads an activation to the neuron. This is a necessary functionality at least for
    // input neurons, where the activations are the input values of the neural network
    this.activation = activation;
  }
  getActivation() {
    // returns the activation of the neuron. This can be used if one wishes to know activations
    // within the neural network or the output of the neural network
    return this.activation;
  }
  activate() {
    // generates the activation of a neuron by taking the summing the activation times
    // input-weights of all inputs with the bias and applying the activation function
    if (this.inputs.length === 0) {
      return this;
    }
    let z = 0;
    for (let i = 0; i < this.inputs.length; i++) {
      z += this.inputs[i].weight * this.inputs[i].back.activation;
    }
    z += this.bias;

    this.activation = this.activationFunction(z);
    return this;
  }
  getData() {
    // Generates and returns a NeuronData object out of the specific neuron
    let neuronData = new NeuronData();
    neuronData.bias = [this.bias];
    for (let input of this.inputs) {
      neuronData.inputWeights.push(input.weight);
    }
    return neuronData;
  }
  loadData(neuronData = null) {
    // Loads the values of a NeuronData object to the object
    if (neuronData === null) {
      return this;
    }
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].weight = neuronData.inputWeights[i];
    }
    this.bias = neuronData.bias[0];
    return this;
  }
  toString() {
    // Returns the string representation
    return `Neuron: inputs = ${this.inputs.length}, outputs = ${this.outputs.length}, bias = ${this.bias}`;
  }
}
export default Neuron;
