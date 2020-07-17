import React from "react";
import { connect } from "react-redux";
import NeuralNetworkBarsUI from "./NeuralNetworkChart/NeuralNetworkBars";
import NeuralNetworkRadarUI from "./NeuralNetworkChart/NeuralNetworkRadar";

class AnalysisPaneUI extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.context = null;
  }
  gridToImage(grid, color) {
    let imageArray = new Uint8ClampedArray(
      grid.xFields * grid.yFields * 4
    ).fill(255);
    for (let i = 0; i < Math.floor(imageArray.length / 4); i++) {
      if (grid.fields[i].isFilled) {
        imageArray[4 * i + 0] = color.r;
        imageArray[4 * i + 1] = color.g;
        imageArray[4 * i + 2] = color.b;
      }
    }
    return new ImageData(imageArray, grid.xFields, grid.yFields);
  }

  updateCanvas() {
    if (this.props.selectedSegment) {
      this.context = this.canvas.getContext("2d");
      this.context.putImageData(
        this.gridToImage(
          this.props.selectedSegment.tools.gridScaler.scale(28, 28),
          { r: 30, g: 30, b: 30 }
        ),
        0,
        0
      );
    }
  }
  //this.props.selectedSegment.tools.gridScaler.scale(200, 200)
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    console.log(
      this.props.neuralNetwork.tools.neuralNetworkManipulator.extractMatrixData()
    );
    console.log(this.props.neuralNetwork);
    let vectorizedSegment = null;
    let output = null;
    let prediction = null;
    if (this.props.selectedSegment) {
      vectorizedSegment = this.props.selectedSegment.tools.gridScaler
        .scale(28, 28)
        .tools.gridManipulator.gridToArray();
      console.log(vectorizedSegment);
      console.log("INPUT:");
      console.log(JSON.stringify(vectorizedSegment));
      output = this.props.predictor.evaluate(vectorizedSegment);
      console.log("OUTPUT:");
      console.log(JSON.stringify(output));
      console.log("NETWORK:");
      console.log(this.props.neuralNetwork);

      prediction = this.props.outputMap[output.indexOf(Math.max(...output))];
    }
    return (
      <div height={400}>
        <div style={{ background: "white", margin: "4px" }}>
          <canvas
            width={28}
            height={28}
            style={{ border: "thin solid black" }}
            ref={(ref) => (this.canvas = ref)}
          />{" "}
        </div>
        <div>{prediction}</div>
        <NeuralNetworkBarsUI data={output} />
        <NeuralNetworkRadarUI data={output} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    predictor:
      state.predictorReducer.neuralNetwork.tools.neuralNetworkActivator,
    neuralNetwork: state.predictorReducer.neuralNetwork,
    outputMap: state.predictorReducer.outputMap,
  };
};

export default connect(mapStateToProps)(AnalysisPaneUI);
