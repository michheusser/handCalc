import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

const useStyles = (theme) => ({
  canvas: { margin: 0, padding: 0 },
});

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
      <canvas
        width={40}
        height={40}
        style={{ border: "none", margin: 0, padding: 0 }}
        ref={(ref) => {
          this.updateCanvas(ref, this.props.index);
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
    segments: state.resultPaneReducer.scaledOriginalSegments,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SegmentUI));
