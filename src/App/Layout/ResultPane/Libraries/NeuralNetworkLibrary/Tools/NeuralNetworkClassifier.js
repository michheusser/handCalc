import NeuralNetworkTool from "./NeuralNetworkTool";

class NeuralNetworkClassifier extends NeuralNetworkTool {
  constructor(outputMap = null) {
    super();
    this.outputMap = outputMap;
  }
  loadOutputMap(outputMap) {
    this.outputMap = outputMap;
    return this;
  }
  classifyGrid(grid) {
    let vectorizedGrid = grid.tools.gridManipulator.gridToArray();
    let output = this.network.tools.neuralNetworkActivator.evaluate(
      vectorizedGrid
    );
    let maxIndex = output.indexOf(Math.max(...output));
    return this.outputMap[maxIndex];
  }
}

export default NeuralNetworkClassifier;
