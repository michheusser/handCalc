import Tool from "./Tool";
import NeuralNetworkData from "../Data/NeuralNetworkData";

class Manipulator extends Tool {
  // Provides the high level methods to deal with a neural network's data
  initialize(value = null) {
    // Initializes the neural network
    for (let i = 1; i < this.network.layers.length; i++) {
      this.network.layers[i].initialize(value);
    }
    console.log("Initialized Neural Network with given weights and bias.");
    return this.network;
  }
  loadData(networkData) {
    // Loads the data object onto a neural network
    this.network.loadData(networkData);
    return this.network;
  }
  extractData() {
    // Extracts the data object out of a neural network
    return this.network.getData();
  }
  loadMatrixData(matrixData) {
    // Loads the data onto a neural network as an array of matrices
    this.network.loadData(new NeuralNetworkData().loadDataArray(matrixData));
    return this.network;
  }
  extractMatrixData() {
    // Extracts the data out of a neural network as an array of matrices
    const data = this.extractData();
    return data.getDataArray();
  }
}
export default Manipulator;
