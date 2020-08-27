/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

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
  updateCanvas(canvas, idx) {
    if (canvas) {
      this.context = canvas.getContext("2d");
      const color = { r: 100, g: 100, b: 100 };
      const image = this.props.segments[idx].tools.manipulator.gridToImage(
        color
      );

      let renderer = document.createElement("canvas");
      renderer.width = image.width;
      renderer.height = image.height;
      renderer.getContext("2d").putImageData(image, 0, 0);
      this.context.imageSmoothingEnabled = false;
      // Now we can scale our image, by drawing our second canvas
      this.context.drawImage(renderer, 0, 0, canvas.width, canvas.height);
      this.context.imageSmoothingEnabled = false;
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
          ref={(canvas) => {
            this.updateCanvas(canvas, this.props.index);
          }}
        />
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    segments: state.gridProcessorReducer.originalSegments,
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
