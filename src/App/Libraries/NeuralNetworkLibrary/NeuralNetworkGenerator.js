import NeuralNetwork from "./NeuralNetwork/NeuralNetwork";
import NeuralNetworkBuilder from "./Tools/NeuralNetworkBuilder";
import NeuralNetworkManipulator from "./Tools/NeuralNetworkManipulator";
import NeuralNetworkActivator from "./Tools/NeuralNetworkActivator";
import NeuralNetworkClassifier from "./Tools/NeuralNetworkClassifier";

class NeuralNetworkGenerator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new NeuralNetworkBuilder(),
      new NeuralNetworkManipulator(),
      new NeuralNetworkActivator(),
      new NeuralNetworkClassifier()
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

export default NeuralNetworkGenerator;
