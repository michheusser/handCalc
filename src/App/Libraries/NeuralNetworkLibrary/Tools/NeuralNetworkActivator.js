import NeuralNetworkTool from "./NeuralNetworkTool";

class NeuralNetworkActivator extends NeuralNetworkTool {
  evaluate(
    inputList // list of input activators for the first layer
  ) {
    return this.network
      .loadActivation(inputList, 0)
      .activate()
      .getActivation(this.network.layers.length - 1);
  }
}

export default NeuralNetworkActivator;
