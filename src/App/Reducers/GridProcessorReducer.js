import GridGenerator from "../Libraries/GridLibrary/Generator";
import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/Generator";
import neuralNetworkMatrixData from "../Assets/NeuralNetwork/MatrixData";

const curatedFitData = {
  xFields: 28,
  yFields: 28,
  xMargin: 0,
  yMargin: 0,
  keepRatio: true,
  scaleStroke: true,
  initialWrap: true,
};

const outputMap = "0123456789+-*/()";
const layers = [784, 64, 32, 16];
const neuralNetwork = new NeuralNetworkGenerator()
  .createNeuralNetwork(layers)
  .tools.manipulator.loadMatrixData(neuralNetworkMatrixData);
const predictor = neuralNetwork.tools.classifier.loadOutputMap(outputMap);

const initialState = {
  activeFields: [],
  segmentPredictionsInfo: [],
  originalSegmentsInfo: [],
  curatedSegmentsInfo: [],
  originalSegments: [],
  curatedSegments: [],
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
    return segment.tools.cloner
      .clone()
      .tools.scaler.fit(
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
    const predictedExpressionEvaluated = (
      Math.round(eval(predictedExpression) * 100) / 100
    ).toString();
    if (
      predictedExpressionEvaluated === predictedExpression ||
      isNaN(predictedExpressionEvaluated)
    ) {
      outputString = predictedExpression;
    } else {
      outputString = predictedExpression + " = " + predictedExpressionEvaluated;
    }
  } catch (err) {
    outputString = predictedExpression;
  }
  return outputString;
}

function equalActiveFields(activeFieldsA, activeFieldsB) {
  if (activeFieldsA.length === activeFieldsB.length) {
    for (let i = 0; i < activeFieldsA.length; i++) {
      if (!equalField(activeFieldsA[i], activeFieldsB[i])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function equalField(fieldA, fieldB) {
  if (fieldA[0] === fieldB[0] && fieldA[1] === fieldB[1]) {
    return true;
  }
  return false;
}

function maxActiveFields(activeFields) {
  const minVals = [1, 1];
  const maxValues = activeFields.reduce((acc, currVal) => {
    return [Math.max(acc[0], currVal[0]), Math.max(acc[1], currVal[1])];
  }, minVals);
  return maxValues;
}

const gridProcessorReducer = (state = initialState, action) => {
  if (action.type === "PROCESS_GRID") {
    const activeFields = getActiveFields(action.payload.fields);
    if (activeFields.length === 0) {
      return initialState;
    }
    if (equalActiveFields(activeFields, state.activeFields)) {
      console.log("equal grids");
      return state;
    }

    const newGrid = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.cropper.wrap();

    const originalSegments = newGrid.tools.segmentator.createSegments();
    const originalSegmentsInfo = segmentArrayInformation(originalSegments);
    newGrid.tools.segmentator.makeSquareSegments();

    const curatedSegments = scaleSegmentArray(originalSegments, curatedFitData);
    const curatedSegmentsInfo = segmentArrayInformation(curatedSegments);

    const segmentPredictionsInfo = generatePredictionInfo(curatedSegments);

    const outputString = generateOutputString(segmentPredictionsInfo);

    let newState = {
      activeFields: activeFields,
      segmentPredictionsInfo: segmentPredictionsInfo,
      originalSegmentsInfo: originalSegmentsInfo,
      curatedSegmentsInfo: curatedSegmentsInfo,
      originalSegments: originalSegments,
      curatedSegments: curatedSegments,
      outputMap: outputMap,
      displayedResult: outputString,
    };
    return newState;
  }

  return state;
};

export default gridProcessorReducer;
