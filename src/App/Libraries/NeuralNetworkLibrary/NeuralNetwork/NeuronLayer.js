import Neuron from "./Neuron";
import NeuronLayerData from "../Data/NeuronLayerData";

class NeuronLayer {
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
    this.neurons.push(neuron, ...neurons);
    return this;
  }
  fill(layerSize) {
    for (let i = 0; i < layerSize; i++) {
      this.addNeuron();
    }
    return this;
  }
  connectInput(backLayer, weight = null) {
    for (let backNeuron of backLayer) {
      for (let frontNeuron of this) {
        frontNeuron.connectInput(backNeuron, weight);
      }
    }
    return this;
  }
  initialize(value = null) {
    for (let neuron of this) {
      neuron.initialize(value);
    }
  }
  loadActivation(activation) {
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].loadActivation(activation[i]);
    }
    return this;
  }
  getActivation() {
    let activation = [];
    for (let neuron of this) {
      activation.push(neuron.getActivation());
    }
    return activation;
  }
  activate() {
    for (let neuron of this) {
      neuron.activate();
    }
    return this;
  }
  getData() {
    let neuronLayerData = new NeuronLayerData();
    for (let neuron of this) {
      neuronLayerData.neuronData.push(neuron.getData());
    }
    return neuronLayerData;
  }
  loadData(layerData = null) {
    if (layerData === null) {
      return this;
    }
    for (let i = 0; i < this.neurons.length; i++) {
      this.neurons[i].loadData(layerData.neuronData[i]);
    }
    //console.log("Layer data loaded.");
    return this;
  }
  toString() {
    let string = `  * Neuron Layer with ${this.neurons.length} neurons:\n`;
    for (let neuron of this) {
      return (string += `    ** ` + neuron.toString() + `\n`);
    }
    return string;
  }
}
export default NeuronLayer;
