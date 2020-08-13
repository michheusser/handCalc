import GridGenerator from "../Libraries/GridLibrary/GridGenerator";
import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Libraries/NeuralNetworkLibrary/Tools/NeuralNetworkMatrixData";

let resultPaneReducer = (
  state = {
    boardGridSegments: [],
    outputMap: "",
    segmentLikelihoods: [],
    segmentPredictions: [],
    scaledGridSegments: [],
    predictionLikelihood: null,
    predictedExpression: "",
    displayedResult: "",
    result: "",
    paneOpen: false,
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

    if (boardGridSegments.length === 0) {
      return state;
    }

    let scaledGridSegments = [];
    for (let segment of boardGridSegments) {
      scaledGridSegments.push(
        segment.tools.gridCloner.clone().tools.gridScaler.scale(40, 40, false)
      );
    }

    let outputMap = "0123456789+-*/()";
    let neuralNetwork = new NeuralNetworkGenerator()
      .createNeuralNetwork([784, 64, 32, 16])
      .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData);
    let predictor = neuralNetwork.tools.neuralNetworkClassifier.loadOutputMap(
      outputMap
    );

    let outputString = "";
    let outputEvaluated = "";
    let displayedResult = "";
    let segmentLikelihoods = [];
    let segmentPredictions = [];
    let predictionLikelihoods = [];
    for (let segment of boardGridSegments) {
      let output = predictor.classifyGrid(segment);
      segmentPredictions.push(output.prediction);
      segmentLikelihoods.push(output.likelihood);
      predictionLikelihoods.push(output.predictionLikelihood);
    }
    outputString = segmentPredictions.join("");

    try {
      outputEvaluated = eval(outputString).toString();
      if (outputString === outputEvaluated) {
        displayedResult = outputEvaluated;
      } else {
        displayedResult = outputString + " = " + outputEvaluated;
      }
    } catch (err) {
      outputEvaluated = "";
      displayedResult = outputString;
    }

    let newState = {
      boardGridSegments: boardGridSegments,
      scaledGridSegments: scaledGridSegments,
      outputMap: outputMap,
      predictionLikelihoods: predictionLikelihoods,
      predictedExpression: outputString,
      segmentLikelihoods: segmentLikelihoods,
      segmentPredictions: segmentPredictions,
      displayedResult: displayedResult,
      result: outputEvaluated,
      paneOpen: true,
    };
    return newState;
  }
  if (action.type === "RESET_RESULT") {
    let newState = {
      boardGridSegments: [],
      scaledGridSegments: [],
      outputMap: "",
      segmentLikelihoods: [],
      segmentPredictions: [],
      predictedExpression: "",
      predictionLikelihood: null,
      displayedResult: "",
      result: "",
      paneOpen: false,
    };
    return newState;
  }
  return state;
};

export default resultPaneReducer;
