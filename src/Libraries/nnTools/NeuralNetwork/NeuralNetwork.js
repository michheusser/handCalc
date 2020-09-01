/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import NeuronLayer from "./NeuronLayer";
import NeuralNetworkData from "../Data/NeuralNetworkData";

class NeuralNetwork {
  constructor() {
    this.layers = [];
    this.tools = {};
  }
  [Symbol.iterator]() {
    // makes layers within the network iterable in for...of loops.
    let counter = 0;
    return {
      next: () => ({
        done: counter === this.layers.length,
        value: this.layers[counter++],
      }),
    }; // when done == true, value is not returned anymore
  }
  addLayer(layer = new NeuronLayer(), ...layers) {
    // Adds a new layer at the end of the neural network
    this.layers.push(layer, ...layers);
    return this;
  }
  getData() {
    // Generates a neural network data object from the neural network object
    let neuralNetworkData = new NeuralNetworkData();
    for (let i = 0; i < this.layers.length; i++) {
      neuralNetworkData.layerData.push(this.layers[i].getData());
    }
    return neuralNetworkData;
  }
  loadData(networkData = null) {
    // Loads a neural network data object to the neural network object
    if (networkData === null) {
      return this;
    }
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].loadData(networkData.layerData[i]);
    }
    return this;
  }
  loadActivation(activation, layer) {
    // Loads an activation to a certain layer (e.g. the input layer)
    this.layers[layer].loadActivation(activation);
    return this;
  }
  getActivation(layer) {
    // Gets the activation of a certain layer
    return this.layers[layer].getActivation();
  }
  activate() {
    // Activates all layers (and thus, neurons) within the neural network according to the
    // activation formula using the input weights, bias, activation of input neurons and
    // activation function
    for (let layer of this) {
      layer.activate();
    }
    return this;
  }
  addTool(toolName, tool) {
    // Adds a tool to the neural network
    tool.network = this;
    this.tools[toolName] = tool;
    return this;
  }
  toString() {
    // Returns the object's string representation
    let string = `Neural Network with ${this.layers.length} layers\n`;
    for (let layer of this) {
      string += layer.toString();
    }
    return string;
  }
}

export default NeuralNetwork;
