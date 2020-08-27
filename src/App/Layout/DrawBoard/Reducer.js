/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// Custom Image Processing Library
import GridGenerator from "../../../Libraries/GridLibrary/Generator";
// Custom Neural Network Library
import NeuralNetworkGenerator from "../../../Libraries/NeuralNetworkLibrary/Generator";
// Imports data of the trained neural Network
import neuralNetworkMatrixData from "../../../Assets/NeuralNetwork/MatrixData";

// ********* CONSTANTS **********
const curatedFitData = {
  // Contains the scaling data for the drawn segments to be fit into the neural network
  xFields: 28,
  yFields: 28,
  xMargin: 0,
  yMargin: 0,
  keepRatio: true,
  scaleStroke: true,
  initialWrap: true,
};

// Output map for the neural network
const outputMap = "0123456789+-*/()";
// Layer information for the neural network
const layers = [784, 64, 32, 16];
// Creation of neural network and importing of training data
const neuralNetwork = new NeuralNetworkGenerator()
  .createNeuralNetwork(layers)
  .tools.manipulator.loadMatrixData(neuralNetworkMatrixData);
//Predictor used to classify inputs out of the neural network
const predictor = neuralNetwork.tools.classifier.loadOutputMap(outputMap);

// Initial state of the reducer (no prediction data available)
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

// **************************** FUNCTIONS ****************************
function getActiveFields(fields2DArray) {
  // Takes a 2D array of booleans and gives out an array of [x,y] arrays of the filled fields.
  // This can be fed to the grid class instance for the segmentation to take place
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
  // Creates an array of custom object containing dimensions and filled fields of an inputted
  // array of segments (grid instances)
  return segmentArray.map((segment) => {
    return {
      xFields: segment.xFields,
      yFields: segment.yFields,
      filledFields: segment.getFilledFields().length,
    };
  });
}

function scaleSegmentArray(segmentArray, scaleData) {
  // Scales an array of segments to the given inputted scaleData
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
  // Generates an array of custom objects containing the prediction output for the inputted array
  // of segments
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
  // Generates the output string for the predicted symbols of an array of drawn segments.
  // Depending on wether the expression can be actually evaluated it returns an equation or
  // only the single predicted symbols that could not be evaluated (e.g. "3++")
  const predictedExpression = segmentPredictionsInfo
    .map((segment) => {
      return segment.prediction;
    })
    .join(" ");

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
  // Compares wether two arrays of [x,y] arrays contain the same elements or not
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
  // Compares wether two [x,y] arrays have the same values in x and y
  if (fieldA[0] === fieldB[0] && fieldA[1] === fieldB[1]) {
    return true;
  }
  return false;
}

// **************************** REDUCER ****************************
const drawBoardReducer = (state = initialState, action) => {
  // Is in charge of taking the drawing of the drawing board, segments it to different,
  // independent drawings, scales their stroke to the desired size and feeds them to the
  // neural network to generate the prediced symbols and the predicted expression
  if (action.type === "PROCESS_GRID") {
    // Main functionality, when the "START" button is pressed for the grid to be processed
    const activeFields = getActiveFields(action.payload.fields);

    // Compares if there are any active fields, in other words, if the grid is empty
    if (activeFields.length === 0) {
      return initialState;
    }

    // Compares wether the new drawing is different than the old one.
    if (equalActiveFields(activeFields, state.activeFields)) {
      console.log("equal grids");
      return state;
    }

    // Creates a grid object out of the active fields fed into the reducer from the layout.
    const newGrid = new GridGenerator()
      .createGrid(action.payload.xFields, action.payload.yFields, activeFields)
      .tools.cropper.wrap();

    // The grid object containing the drawing is segmented into independent grids (array),
    // along with an array containing the information of each segment
    const originalSegments = newGrid.tools.segmentator.createSegments();
    const originalSegmentsInfo = segmentArrayInformation(originalSegments);
    newGrid.tools.segmentator.makeSquareSegments();

    // The original segments are curated by being processed to match the neural network's
    // input dimensions, along with an array containing the information of each segment
    const curatedSegments = scaleSegmentArray(originalSegments, curatedFitData);
    const curatedSegmentsInfo = segmentArrayInformation(curatedSegments);

    // Segments are fed into the neural network and classified to match a prediction. The
    // prediction information of each segment is put into an array
    const segmentPredictionsInfo = generatePredictionInfo(curatedSegments);

    // The output string to be shown in the result pane is created out of the prediction
    const outputString = generateOutputString(segmentPredictionsInfo);

    // The segment and prediction informations are pushed into the reducer's state and onto the
    // various components that use them
    const newState = {
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

export default drawBoardReducer;
