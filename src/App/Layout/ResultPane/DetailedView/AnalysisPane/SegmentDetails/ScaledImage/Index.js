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

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  root: {},
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    paddingLeft: 0,
    paddingTop: 0,
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
  },
  paperInside: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

// **************************** COMPONENT ****************************
class ScaledImage extends React.Component {
  // Displays the image of the processed version of the selected segment
  constructor(props) {
    super(props);
    this.context = null;
  }

  updateCanvas(canvas) {
    if (canvas && this.props.selectedSegment !== null) {
      this.context = canvas.getContext("2d");

      let color = { r: 30, g: 30, b: 30 };
      let segment = this.props.segments[this.props.selectedSegment];

      let image = segment.tools.manipulator.gridToImage(color);

      let renderer = document.createElement("canvas");
      renderer.width = image.width;
      renderer.height = image.height;
      renderer.getContext("2d").putImageData(image, 0, 0);
      this.context.imageSmoothingEnabled = false;
      // Now we can scale our image, by drawing our second canvas
      this.context.drawImage(renderer, 0, 0, canvas.width, canvas.height);
      this.context.imageSmoothingEnabled = false;
      //this.context.putImageData(image, 0, 0);
    }
  }

  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper
        className={classes.paper}
        elevation={0}
        color="secondary"
        height={1}
        width={1}
      >
        <Paper
          className={classes.paperInside}
          variant="outlined"
          color="secondary"
          height={1}
          width={1}
        >
          <canvas
            width={150}
            height={150}
            style={{ border: "none" }}
            ref={(canvas) => {
              this.updateCanvas(canvas);
            }}
          />
        </Paper>
      </Paper>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    selectedSegment: state.resultPaneReducer.selectedSegment,
    segments: state.drawBoardReducer.curatedSegments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ScaledImage));
