import React from "react";
//import neuralNetworkMatrixData from ".../Libraries/NeuralNetworkLibrary/Tools/SavedNetwork/NeuralNetworkMatrixData";
//import neuralNetworkMatrixData from ".../Libraries/NeuralNetworkLibrary/NeuralNetworkMatrixData";
import neuralNetworkMatrixData from "./NeuralNetworkMatrixData";

class GridToolbarUI extends React.Component {
  test() {
    console.log(neuralNetworkMatrixData);
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
