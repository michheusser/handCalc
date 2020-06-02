import NeuralNetworkGenerator from "../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
import neuralNetworkMatrixData from "../Libraries/NeuralNetworkLibrary/NeuralNetworkMatrixData";

let predictorReducer = (
  state = {
    neuralNetwork: new NeuralNetworkGenerator()
      .createNeuralNetwork([784, 30, 10])
      .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData),
  },
  action
) => {
  return state;
};

export default predictorReducer;
