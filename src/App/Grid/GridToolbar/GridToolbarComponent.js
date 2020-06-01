import React from "react";
import NeuralNetworkGenerator from "./NeuralNetworkLibrary/NeuralNetworkGenerator";

class GridToolbarUI extends React.Component {
  test() {
    const neuralNetworkSize = [5, 4, 3];

    const zeroNeuralNetwork = new NeuralNetworkGenerator()
      .createNeuralNetwork(neuralNetworkSize)
      .tools.neuralNetworkManipulator.initialize(0);
    const oneNeuralNetwork = new NeuralNetworkGenerator()
      .createNeuralNetwork(neuralNetworkSize)
      .tools.neuralNetworkManipulator.initialize(1);
    const zeroNeuralNetworkMatrixData = zeroNeuralNetwork.tools.neuralNetworkManipulator.extractMatrixData();
    const oneNeuralNetworkMatrixData = oneNeuralNetwork.tools.neuralNetworkManipulator.extractMatrixData();
    const zeroNeuralNetworkData = zeroNeuralNetwork.tools.neuralNetworkManipulator.extractData();
    const oneNeuralNetworkData = oneNeuralNetwork.tools.neuralNetworkManipulator.extractData();

    console.log("zeroNeuralNetworkMatrixData:");
    console.log(zeroNeuralNetworkMatrixData);
    console.log("oneNeuralNetworkMatrixData:");
    console.log(oneNeuralNetworkMatrixData);
    console.log("Replacing data of oneNeuralNetwork...");
    oneNeuralNetwork.tools.neuralNetworkManipulator.loadMatrixData(
      zeroNeuralNetworkMatrixData
    );
    console.log(
      oneNeuralNetwork.tools.neuralNetworkManipulator.extractMatrixData()
    );

    //console.log(neuralNetwork.tools.neuralNetworkManipulator.extractData());
    //console.log(neuralNetwork.tools.neuralNetworkManipulator.extractMatrixData());

    //const input = [5, 4, 3, 2, 1];
    //console.log(neuralNetwork.tools.neuralNetworkActivator.evaluate(input));
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
