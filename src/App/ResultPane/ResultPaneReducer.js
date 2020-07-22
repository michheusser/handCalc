import GridGenerator from "../Libraries/GridLibrary/GridGenerator";
import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Libraries/NeuralNetworkLibrary/Tools/NeuralNetworkMatrixData";

let resultPaneReducer = (
  state = {
    boardGridSegments: [],
    predictedExpression: "",
    result: "",
  },
  action
) => {
  if (action.type === "PROCESS_GRID") {
    let activeFields = [];
    for (let x = 0; x < action.payload.fields.length; x++) {
      for (let y = 0; y < action.payload.fields[0].length; y++) {
        if (action.payload.fields[x][y]) {
          activeFields.push([x, y]);
        }
      }
    }

    let boardGridSegments = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.gridSegmentator.createSegments({
        xFields: 28,
        yFields: 28,
        xMargin: 0,
        yMargin: 0,
        keepRatio: true,
      });
    let outputMap = "0123456789+-*/()";
    let neuralNetwork = new NeuralNetworkGenerator()
      .createNeuralNetwork([784, 64, 32, 16])
      .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData);
    let predictor = neuralNetwork.tools.neuralNetworkClassifier.loadOutputMap(
      outputMap
    );

    let outputString = "";
    let outputEvaluated = "";
    for (let segment of boardGridSegments) {
      let output = predictor.classifyGrid(
        segment.tools.gridScaler.scale(28, 28)
      );
      outputString += output;

      try {
        outputEvaluated = eval(outputString);
      } catch (err) {
        outputEvaluated = "Syntax Error";
      }
    }

    let newState = {
      boardGridSegments: boardGridSegments,
      predictedExpression: outputString,
      result: outputEvaluated,
    };

    return newState;
  }
  return state;
};

export default resultPaneReducer;
