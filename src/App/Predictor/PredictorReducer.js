import NeuralNetworkGenerator from "../Layout/ResultPane/Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Layout/ResultPane/Libraries/NeuralNetworkLibrary/Tools/NeuralNetworkMatrixData";

let predictorReducer = (
  state = {
    outputMap: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "%",
      "[",
      "]",
    ],
    neuralNetwork: new NeuralNetworkGenerator()
      .createNeuralNetwork([784, 64, 32, 16])
      .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData),
  },
  action
) => {
  return state;
};

export default predictorReducer;
