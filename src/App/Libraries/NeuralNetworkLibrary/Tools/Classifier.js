import Tool from "./Tool";

class Classifier extends Tool {
  constructor(outputMap = null) {
    super();
    this.outputMap = outputMap;
  }
  loadOutputMap(outputMap) {
    this.outputMap = outputMap;
    return this;
  }
  classifyGrid(grid) {
    let vectorizedGrid = grid.tools.manipulator.gridToArray();
    let neuronOutput = this.network.tools.activator.evaluate(vectorizedGrid);

    let neuronOutputSum = neuronOutput.reduce(function (a, b) {
      return a + b;
    }, 0);

    let likelihood = neuronOutput.map((value) => value / neuronOutputSum);

    let maxIndex = neuronOutput.indexOf(Math.max(...neuronOutput));
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
