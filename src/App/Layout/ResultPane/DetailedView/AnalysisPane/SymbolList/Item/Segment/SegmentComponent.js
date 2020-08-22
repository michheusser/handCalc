import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";

const useStyles = (theme) => ({
  canvas: { margin: 0, padding: 0 },
  paper: {
    margin: 0,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
    const { classes } = this.props;
    let borderStyle = { padding: "6px" };
    let variant = "elevation";
    if (this.props.selectedSegment === this.props.index) {
      borderStyle = { borderColor: "#3a8a74", borderWidth: "3px" };
      variant = "outlined";
    }
    return (
      <Paper
        style={borderStyle}
        className={classes.paper}
        variant={variant}
        elevation={1}
        color="secondary"
        height={1}
        width={1}
      >
        <canvas
          width={40}
          height={40}
          style={{ border: "none", margin: 0, padding: 0 }}
          ref={(ref) => {
            this.updateCanvas(ref, this.props.index);
          }}
        />
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    segments: state.gridProcessorReducer.scaledOriginalSegments,
    selectedSegment: state.analysisPaneReducer.selectedSegment,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SegmentUI));
