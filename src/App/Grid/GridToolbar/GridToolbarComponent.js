import React from "react";
//import NeuralNetworkGenerator from ".../Libraries/NeuralNetworkLibrary/NeuralNetworkGenerator";
//import neuralNetworkMatrixData from ".../Libraries/NeuralNetworkLibrary/NeuralNetworkMatrixData";

class GridToolbarUI extends React.Component {
  test() {
    /*const neuralNetworkSize = [784, 30, 10];
    const neuralNetwork = new NeuralNetworkGenerator()
      .createNeuralNetwork(neuralNetworkSize)
      .tools.neuralNetworkManipulator.loadMatrixData(neuralNetworkMatrixData);
    console.log(
      neuralNetwork.tools.neuralNetworkManipulator.extractMatrixData()
    );
*/
  }

  render() {
    return (
      <div>
        {" "}
        <button onClick={this.props.processGrid}>Process</button>{" "}
        <button onClick={this.test}>Test</button>
      </div>
    );
  }
}

export default GridToolbarUI;
