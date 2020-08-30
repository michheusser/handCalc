import Tool from "./Tool";

class Classifier extends Tool {
  // Contains the methods to classify the output of a neural network upon
  // feedforwarding a certain input
  constructor(outputMap = null) {
    super();
    this.outputMap = outputMap;
  }
  loadOutputMap(outputMap) {
    // Loads the output map corresponding to the clasification of output neurons
    this.outputMap = outputMap;
    return this;
  }
  classifyGrid(grid) {
    // Classifies a certain grid object according to the inpputed output vector
    const vectorizedGrid = grid.tools.manipulator.gridToArray();
    const neuronOutput = this.network.tools.activator.evaluate(vectorizedGrid);

    const neuronOutputSum = neuronOutput.reduce(function (a, b) {
      return a + b;
    }, 0);

    const likelihood = neuronOutput.map((value) => value / neuronOutputSum);

    const maxIndex = neuronOutput.indexOf(Math.max(...neuronOutput));
    const output = {
      neuronOutput: neuronOutput,
      likelihood: likelihood,
      prediction: this.outputMap[maxIndex],
      predictionLikelihood: likelihood[maxIndex],
    };

    return output;
  }
}

export default Classifier;
