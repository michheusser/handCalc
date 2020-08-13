import NeuralNetworkTool from "./NeuralNetworkTool";
import NeuralNetworkData from "../Data/NeuralNetworkData";

class NeuralNetworkManipulator extends NeuralNetworkTool {
  initialize(value = null) {
    // for (let layer of this.network) {
    //   layer.initialize(value);
    // }
    for (let i = 1; i < this.network.layers.length; i++) {
      this.network.layers[i].initialize(value);
    }
    console.log("Initialized Neural Network with given weights and bias.");
    return this.network;
  }
  loadData(networkData) {
    this.network.loadData(networkData);
    return this.network;
  }
  extractData() {
    return this.network.getData();
  }
  extractMatrixData() {
    const data = this.extractData();
    return data.getDataArray();
  }
  loadMatrixData(matrixData) {
    this.network.loadData(new NeuralNetworkData().loadDataArray(matrixData));
    return this.network;
  }
  toString() {}
}
export default NeuralNetworkManipulator;
