import React from "react";
import Button from "@material-ui/core/Button";

import { ThemeProvider } from "@material-ui/core/styles";

import { connect } from "react-redux";

class SegmentUI extends React.Component {
  constructor(props) {
    super(props);
    this.context = null;
  }
  updateCanvas(ref, idx) {
    if (ref) {
      this.context = ref.getContext("2d");
      const color = { r: 100, g: 100, b: 100 };
      this.context.putImageData(
        this.props.segments[idx].tools.gridManipulator.gridToImage(color),
        0,
        0
      );
    }
  }
  render() {
    return (
      <div>
        <canvas
          width={100}
          height={100}
          style={{ border: "thin solid black", margin: 0 }}
          ref={(ref) => {
            this.updateCanvas(ref, this.props.index);
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
    segments: state.resultPaneReducer.boardGridSegments,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentUI);