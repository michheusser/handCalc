/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import NeuralNetwork from "./NeuralNetwork/NeuralNetwork";
import Builder from "./Tools/Builder";
import Manipulator from "./Tools/Manipulator";
import Activator from "./Tools/Activator";
import Classifier from "./Tools/Classifier";

class Generator {
  // Provides a high level API to deal with neural network creation. Since it requires complex
  // building and initialization this is the recommended way of creating neural networks
  constructor() {
    this.tools = {};
  }
  createNeuralNetwork(size, data = null) {
    // Creates and initializates a neural network object with all its tools
    let newNeuralNetwork = new NeuralNetwork();
    this._loadTools()._addTools(newNeuralNetwork);
    newNeuralNetwork.tools.builder.build(...size);
    newNeuralNetwork.tools.manipulator.loadData(data);
    return newNeuralNetwork;
  }
  _loadTools() {
    // Loads all the necessary tools to the generator object
    this.tools = {
      builder: new Builder(),
      manipulator: new Manipulator(),
      activator: new Activator(),
      classifier: new Classifier(),
    };
    return this;
  }
  _addTools(network) {
    // Adds the tools of the object to the neural network and connects them accordingly
    for (let entry of Object.entries(this.tools)) {
      network.addTool(entry[0], entry[1]);
    }
    return network;
  }
}

export default Generator;
