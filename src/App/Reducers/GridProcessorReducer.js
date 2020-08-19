import GridGenerator from "../Libraries/GridLibrary/GridGenerator";
import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Libraries/NeuralNetworkLibrary/Tools/NeuralNetworkMatrixData";

const gridProcessorReducer = (
  state = {
    grid: new GridGenerator().createGrid(1, 1),
    originalSegments: [],
    curatedSegments: [],
    scaledOriginalSegments: [],
    scaledCuratedSegments: [],
    outputMap: "",
    segmentLikelihoods: [],
    segmentPredictions: [],
    predictionLikelihood: null,
    predictedExpression: "",
    displayedResult: "",
    result: "",
    //paneOpen: false,
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
    const newGrid = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.gridCropper.wrap();

    const originalSegments = newGrid.tools.gridSegmentator.createSegments();

    if (originalSegments.length === 0) {
      return state;
    }

    const originalScaledFitData = {
      xFields: 40,
      yFields: 40,
      xMargin: 0,
      yMargin: 0,
      keepRatio: true,
      scaleStroke: false,
    };

    let scaledOriginalSegments = [];
    for (let segment of originalSegments) {
      scaledOriginalSegments.push(
        segment.tools.gridCloner
          .clone()
          .tools.gridScaler.fit(
            originalScaledFitData.xFields,
            originalScaledFitData.yFields,
            originalScaledFitData.xMargin,
            originalScaledFitData.yMargin,
            originalScaledFitData.keepRatio,
            originalScaledFitData.scaleStroke
          )
      );
    }

    const curatedFitData = {
      xFields: 28,
      yFields: 28,
      xMargin: 0,
      yMargin: 0,
      keepRatio: true,
      scaleStroke: true,
    };

    let curatedSegments = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.gridSegmentator.createSegments(curatedFitData);

    const curatedScaledFitData = {
      xFields: 150,
      yFields: 150,
      scaleStroke: false,
    };

    let scaledCuratedSegments = [];
    for (let segment of curatedSegments) {
      scaledCuratedSegments.push(
        segment.tools.gridCloner
          .clone()
          .tools.gridScaler.scale(
            curatedScaledFitData.xFields,
            curatedScaledFitData.yFields,
            curatedScaledFitData.scaleStroke
          )
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
    for (let segment of curatedSegments) {
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
      grid: newGrid,
      originalSegments: originalSegments,
      curatedSegments: curatedSegments,
      scaledOriginalSegments: scaledOriginalSegments,
      scaledCuratedSegments: scaledCuratedSegments,
      outputMap: outputMap,
      predictionLikelihoods: predictionLikelihoods,
      predictedExpression: outputString,
      segmentLikelihoods: segmentLikelihoods,
      segmentPredictions: segmentPredictions,
      displayedResult: displayedResult,
      result: outputEvaluated,
      //paneOpen: true,
    };
    return newState;
  }
  /*if (action.type === "RESET_RESULT") {
    let newState = {
      grid: new GridGenerator().createGrid(1, 1),
      originalSegments: [],
      curatedSegments: [],
      scaledOriginalSegments: [],
      scaledCuratedSegments: [],
      outputMap: "",
      segmentLikelihoods: [],
      segmentPredictions: [],
      predictedExpression: "",
      predictionLikelihood: null,
      displayedResult: "",
      result: "",
      //paneOpen: false,
    };
    return newState;
  }*/
  return state;
};

export default gridProcessorReducer;
