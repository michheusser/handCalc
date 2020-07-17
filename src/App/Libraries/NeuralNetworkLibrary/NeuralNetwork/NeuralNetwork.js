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
    this.layers.push(layer, ...layers);
    return this;
  }
  getData() {
    let neuralNetworkData = new NeuralNetworkData();
    for (let i = 0; i < this.layers.length; i++) {
      neuralNetworkData.layerData.push(this.layers[i].getData());
    }
    return neuralNetworkData;
  }
  loadData(networkData = null) {
    if (networkData === null) {
      return this;
    }
    for (let i = 0; i < this.layers.length; i++) {
      this.layers[i].loadData(networkData.layerData[i]);
    }
    return this;
  }
  loadActivation(activation, layer) {
    this.layers[layer].loadActivation(activation);
    return this;
  }
  getActivation(layer) {
    //console.log(this.layers);
    return this.layers[layer].getActivation();
  }
  activate() {
    let counter = 0;
    for (let layer of this) {
      //console.log(`Layer: ${counter}`);
      //counter++;
      layer.activate();
    }
    return this;
  }

  addTool(neuralNetworkTool) {
    if (
      neuralNetworkTool.__proto__.__proto__.constructor.name !==
      "NeuralNetworkTool"
    ) {
      console.log("Uncompatible. No tool was added.");
      return this;
    }
    neuralNetworkTool.network = this;
    this.tools[neuralNetworkTool.name] = neuralNetworkTool;
    /*console.log(
      `Tool added! Name: ${neuralNetworkTool.name}, Type: ${neuralNetworkTool.__proto__.constructor.name}`
    );*/
    return this;
  }
  toString() {
    let string = `Neural Network with ${this.layers.length} layers\n`;
    for (let layer of this) {
      string += layer.toString();
    }
    return string;
  }
}

export default NeuralNetwork;
