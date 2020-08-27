/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
// Redux (State Management)
import { connect } from "react-redux";
// Material UI (Components)
import Paper from "@material-ui/core/Paper";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";
// Diverse

// **************************** STYLING ****************************
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

// **************************** COMPONENT ****************************
class Segment extends React.Component {
  // Handles the canvas element that scales the processed image and displays it.
  constructor(props) {
    super(props);
    this.context = null;
  }
  updateCanvas(canvas, idx) {
    if (canvas) {
      this.context = canvas.getContext("2d");
      const color = { r: 100, g: 100, b: 100 };
      // Converts the segments as grid-objects to Image Data readable by a canvas
      const image = this.props.segments[idx].tools.manipulator.gridToImage(
        color
      );

      // Creates an artificial canvas to scale the images, extract them and place them in the
      // actual canvas to be shown
      const renderer = document.createElement("canvas");
      renderer.width = image.width;
      renderer.height = image.height;
      renderer.getContext("2d").putImageData(image, 0, 0);
      this.context.imageSmoothingEnabled = false;
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

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    segments: state.drawBoardReducer.originalSegments,
    selectedSegment: state.resultPaneReducer.selectedSegment,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Segment));
