import GridGenerator from "../Libraries/GridLibrary/GridGenerator";
import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Libraries/NeuralNetworkLibrary/Tools/NeuralNetworkMatrixData";

const curatedFitData = {
  xFields: 28,
  yFields: 28,
  xMargin: 0,
  yMargin: 0,
  keepRatio: true,
  scaleStroke: true,
  initialWrap: true,
};

const originalScaledFitData = {
  xFields: 40,
  yFields: 40,
  xMargin: 0,
  yMargin: 0,
  keepRatio: true,
  scaleStroke: false,
  initialWrap: false,
};

const curatedScaledFitData = {
  xFields: 140,
  yFields: 140,
  xMargin: 0,
  yMargin: 0,
  keepRatio: true,
  scaleStroke: false,
  initialWrap: false,
};

const outputMap = "0123456789+-*/()";
const layers = [784, 64, 32, 16];
const neuralNetwork = new NeuralNetworkGenerator()
  .createNeuralNetwork(layers)
  .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData);
const predictor = neuralNetwork.tools.neuralNetworkClassifier.loadOutputMap(
  outputMap
);

const initialState = {
  grid: new GridGenerator().createGrid(1, 1),
  segmentPredictionsInfo: [],
  originalSegmentsInfo: [],
  curatedSegmentsInfo: [],
  originalSegments: [],
  curatedSegments: [],
  scaledOriginalSegments: [],
  scaledCuratedSegments: [],
  outputMap: "",
  displayedResult: "",
};

function getActiveFields(fields2DArray) {
  let activeFields = [];
  for (let x = 0; x < fields2DArray.length; x++) {
    for (let y = 0; y < fields2DArray[0].length; y++) {
      if (fields2DArray[x][y]) {
        activeFields.push([x, y]);
      }
    }
  }
  return activeFields;
}

function segmentArrayInformation(segmentArray) {
  return segmentArray.map((segment) => {
    return {
      xFields: segment.xFields,
      yFields: segment.yFields,
      filledFields: segment.getFilledFields().length,
    };
  });
}

function scaleSegmentArray(segmentArray, scaleData) {
  return segmentArray.map((segment) => {
    return segment.tools.gridCloner
      .clone()
      .tools.gridScaler.fit(
        scaleData.xFields,
        scaleData.yFields,
        scaleData.xMargin,
        scaleData.yMargin,
        scaleData.keepRatio,
        scaleData.scaleStroke,
        scaleData.initialWrap
      );
  });
}

function generatePredictionInfo(segmentArray) {
  return segmentArray.map((segment) => {
    const output = predictor.classifyGrid(segment);
    return {
      likelihoods: output.likelihood,
      prediction: output.prediction,
      predictionLikelihood: output.predictionLikelihood,
    };
  });
}

function generateOutputString(segmentPredictionsInfo) {
  const predictedExpression = segmentPredictionsInfo
    .map((segment) => {
      return segment.prediction;
    })
    .join("");

  let outputString = "";
  try {
    const predictedExpressionEvaluated = eval(predictedExpression).toString();
    if (predictedExpressionEvaluated === predictedExpression) {
      outputString = predictedExpression;
    } else {
      outputString = predictedExpression + " = " + predictedExpressionEvaluated;
    }
  } catch (err) {
    outputString = predictedExpression;
  }
  return outputString;
}

const gridProcessorReducer = (state = initialState, action) => {
  if (action.type === "PROCESS_GRID") {
    const activeFields = getActiveFields(action.payload.fields);

    const newGrid = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.gridCropper.wrap();

    const originalSegments = newGrid.tools.gridSegmentator.createSegments();
    const originalSegmentsInfo = segmentArrayInformation(originalSegments);

    if (originalSegments.length === 0) {
      return initialState;
    }

    const curatedSegments = scaleSegmentArray(originalSegments, curatedFitData);
    const curatedSegmentsInfo = segmentArrayInformation(curatedSegments);

    const scaledOriginalSegments = scaleSegmentArray(
      originalSegments,
      originalScaledFitData
    );

    const scaledCuratedSegments = scaleSegmentArray(
      curatedSegments,
      curatedScaledFitData
    );

    const segmentPredictionsInfo = generatePredictionInfo(curatedSegments);

    const outputString = generateOutputString(segmentPredictionsInfo);

    let newState = {
      grid: newGrid,
      segmentPredictionsInfo: segmentPredictionsInfo,
      originalSegmentsInfo: originalSegmentsInfo,
      curatedSegmentsInfo: curatedSegmentsInfo,
      originalSegments: originalSegments,
      curatedSegments: curatedSegments,
      scaledOriginalSegments: scaledOriginalSegments,
      scaledCuratedSegments: scaledCuratedSegments,
      outputMap: outputMap,
      displayedResult: outputString,
    };
    return newState;
  }

  return state;
};

export default gridProcessorReducer;
