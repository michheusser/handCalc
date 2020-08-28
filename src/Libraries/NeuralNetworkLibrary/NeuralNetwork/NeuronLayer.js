/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import Neuron from "./Neuron";
import NeuronLayerData from "../Data/NeuronLayerData";

class NeuronLayer {
  // Contains the values and methods of a neuron layer in the context of a neural network.
  constructor() {
    this.neurons = [];
  }
  [Symbol.iterator]() {
    // makes neurons within the layer iterable in for...of loops.
    let counter = 0;
    return {
      next: () => ({
        done: counter === this.neurons.length,
        value: this.neurons[counter++],
      }),
    }; // when done == true, value is not returned anymore
  }
  addNeuron(neuron = new Neuron(), ...neurons) {
    // Adds neuron at the end of the layer the layer
    this.neurons.push(neuron, ...neurons);
    return this;
  }
  fill(layerSize) {
    // Fills the layer with the specified amount of neurons
    for (let i = 0; i < layerSize; i++) {
      this.addNeuron();
    }
    return this;
  }
  // Connects all the neurons of one layer to all the inputs of a second one
  connectInput(backLayer, weight = null) {
    for (let backNeuron of backLayer) {
      for (let frontNeuron of this) {
        frontNeuron.connectInput(backNeuron, weight);
      }
    }
    return this;
  }
  initialize(value = null) {
    // Initializes all the neurons in the layer
    for (let neuron of this) {
      neuron.initialize(value);
    }
  }
  loadActivation(activation) {
    // Loads an activation array to all the neurons in the layer
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].loadActivation(activation[i]);
    }
    return this;
  }
  getActivation() {
    // gets the activations from all the neurons in the layer
    let activation = [];
    for (let neuron of this) {
      activation.push(neuron.getActivation());
    }
    return activation;
  }
  activate() {
    // Activates all the neurons in the layers according tho the activation formula using
    // the weights, bias, activations of input neurons, and activation function
    for (let neuron of this) {
      neuron.activate();
    }
    return this;
  }
  getData() {
    // Generates a neuron layer data object from the neuron layer object
    let neuronLayerData = new NeuronLayerData();
    for (let neuron of this) {
      neuronLayerData.neuronData.push(neuron.getData());
    }
    return neuronLayerData;
  }
  loadData(layerData = null) {
    // Loads the data from a neuron layer data object to the neuron layer object itself
    if (layerData === null) {
      return this;
    }
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].loadData(layerData.neuronData[i]);
    }
    return this;
  }
  toString() {
    // Returns the string representation
    const string = `  * Neuron Layer with ${this.neurons.length} neurons:\n`;
    for (let neuron of this) {
      return (string += `    ** ` + neuron.toString() + `\n`);
    }
    return string;
  }
}
export default NeuronLayer;
