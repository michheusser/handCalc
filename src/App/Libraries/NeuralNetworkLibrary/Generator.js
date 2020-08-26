import NeuralNetwork from "./NeuralNetwork/NeuralNetwork";
import Builder from "./Tools/Builder";
import Manipulator from "./Tools/Manipulator";
import Activator from "./Tools/Activator";
import Classifier from "./Tools/Classifier";

class Generator {
  constructor() {
    this.tools = [];
  }
  loadTools() {
    this.tools.push(
      new Builder(),
      new Manipulator(),
      new Activator(),
      new Classifier()
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
    newNeuralNetwork.tools.builder.build(...size);
    newNeuralNetwork.tools.manipulator.loadData(data);
    return newNeuralNetwork;
  }
}

export default Generator;
