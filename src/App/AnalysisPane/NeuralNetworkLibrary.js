const ActivationFunctions = Object.freeze({
  sigma: (x) => 1 / (1 + Math.exp(-x)),
});

class NeuronConnection {
  constructor(backNeuron, frontNeuron, weight = 0) {
    this.back = backNeuron;
    this.front = frontNeuron;
    this.weight = weight;
  }
}
class NeuronData {
  constructor() {
    this.inputWeights = [];
    this.bias = 0;
  }
}
class NeuronLayerData {
  constructor() {
    this.neuronData = [];
  }
}
class NeuralNetworkData {
  constructor() {
    this.layerData = [];
  }
}
class Neuron {
  constructor(
    bias = 0,
    activation = 0,
    activationFunction = ActivationFunctions.sigma
  ) {
    this.inputs = [];
    this.outputs = [];
    this.bias = bias;
    this.activation = activation;
    this.activationFunction = activationFunction;
  }
  connectInput(backNeuron, weight = 0) {
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
    if (this.inputs.length < 1) {
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
    console.log("Neuron Data loaded.");
    return this;
  }
  toString() {
    return `Neuron: inputs = ${this.inputs.length}, outputs = ${this.outputs.length}, bias = ${this.bias}`;
    // Todo
  }
  [Symbol.iterator]() { // makes single neurons compatible for iterated neuron layer operations
    let end = false;
    return { next: () => ({ value: this, done: end++ }) };
  }
}
class NeuronLayer {
  constructor() {
    this.neurons = [];
  }
  [Symbol.iterator]() { // makes neurons within the layer iterable in for...of loops.
    let counter = 0;
    let layerLength = this.neurons.length;
    let neurons = this.neurons;
    return {
      next: () => ({
        done: counter === layerLength,
        value: neurons[counter++],
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
  connectInput(backLayer, weight = 0) {
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
    console.log("Layer data loaded.");
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
class NeuralNetwork {
  constructor() {
    this.layers = [];
    this.tools = {};
  }
  [Symbol.iterator]() { // makes layers within the network iterable in for...of loops.
    let counter = 0;
    let networkSize = this.layers.length;
    let layers = this.layers;
    return {
      next: () => ({ done: counter === networkSize, value: layers[counter++] }),
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
    console.log("Network data loaded.");
    return this;
  }
  loadActivation(activation, layer) {
    this.layers[layer].loadActivation(activation);
    return this;
  }
  getActivation(layer) {
    console.log(this.layers);
    return this.layers[layer].getActivation();
  }
  activate() {
    for (let layer of this) {
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
    console.log(
      `Tool added! Name: ${neuralNetworkTool.name}, Type: ${neuralNetworkTool.__proto__.constructor.name}`
    );
    return this;
  }
  toString() {
    let string = `Neural Network with ${this.layers.length} layers\n`;
    let counter = 0;
    for (let layer of this) {
      string += layer.toString();
    }
    return string;
  }
}
class NeuralNetworkTool {
  constructor() {
    this.network = null;
    this.name =
      this.__proto__.constructor.name.charAt(0).toLowerCase() +
      this.__proto__.constructor.name.substring(1);
  }
}
class NeuralNetworkBuilder extends NeuralNetworkTool {
  constructor() {
    super();
  }
  connect(backLayer, frontLayer) {
    for (let backNeuron of backLayer) {
      for (let frontNeuron of frontLayer) {
        frontNeuron.connectInput(backNeuron);
      }
    }
    return this.network;
  }
  buildLayers(...layerSizes) {
    for (let layerSize of layerSizes) {
      let newLayer = new NeuronLayer();
      newLayer.fill(layerSize);
      this.network.addLayer(newLayer);
    }
    return this;
  }
  buildConnections() {
    if (this.network.layers.length <= 1) {
      console.log("Not enough layers to connect.");
      return this.network;
    }
    for (let i = 1; i < this.network.layers.length; i++) {
      this.connect(this.network.layers[i - 1], this.network.layers[i]);
    }
    return this.network;
  }
  build(...layerSizes) {
    return this.buildLayers(...layerSizes).buildConnections();
  }
}
class NeuralNetworkManipulator extends NeuralNetworkTool {
  constructor() {
    super();
  }
  initialize(value = null) {
    for (let layer of this.network) {
      layer.initialize(value);
    }
    console.log("Initialized Neural Network with given weights and bias.");
    return this.network;
  }
  loadData(networkData = null) {
    return this.network.loadData(networkData);
  }
  extractData() {
    return this.network.getData();
  }
  dataToMatrix(data) {
    // Todo
  }
  matrixToData(W, b) {
    // Todo
  }
  toString() {}
}
class NeuralNetworkTrainer extends NeuralNetworkTool {
  constructor() {
    super();
  }
}
class NeuralNetworkActivator extends NeuralNetworkTool {
  constructor() {
    super();
  }
  evaluate(
    inputList // list of input activators for the first layer
  ) {
    return this.network
      .loadActivation(inputList, 0)
      .activate()
      .getActivation(this.network.layers.length - 1);
  }
}
class NeuralNetworkGenerator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new NeuralNetworkBuilder(),
      new NeuralNetworkManipulator(),
      new NeuralNetworkTrainer(),
      new NeuralNetworkActivator()
    );
    return this;
  }
  addTools(network) {
    for (let tool of this.tools) {
      network.addTool(tool);
    }
    return network;
  }
  createNeuralNetwork(size, data = null) {
    let newNeuralNetwork = new NeuralNetwork();
    this.loadTools().addTools(newNeuralNetwork);
    newNeuralNetwork.tools.neuralNetworkBuilder.build(...size);
    newNeuralNetwork.tools.neuralNetworkManipulator.loadData(data);
    return newNeuralNetwork;
  }
}

let neuralNetwork = new NeuralNetworkGenerator().createNeuralNetwork([5, 4, 3]);
neuralNetwork.tools.neuralNetworkManipulator.initialize();
let input = [5, 4, 3, 2, 1];
console.log(neuralNetwork.tools.neuralNetworkActivator.evaluate(input));

/*let neuralNetwork = new NeuralNetworkGenerator().createNeuralNetwork([1,1]);
neuralNetwork.tools.neuralNetworkManipulator.initialize(1);
let input = [4];
let output = neuralNetwork.tools.neuralNetworkActivator.evaluate(input);
console.log("Layers:")
for(i = 0; i<neuralNetwork.layers.length;i++)
{
  console.log(neuralNetwork.getActivation(i))
}*/
