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
import { Paper, Typography } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingLeft: 0,
    display: "block",
    alignItems: "top",
    justifyContent: "top",
  },
});

// **************************** COMPONENT ****************************
class ImageDetails extends React.Component {
  // Displays the details around the selected drawn segment, including the original segment
  // dimensions and the dimensions of the processed segment feed into the neural network
  getMessage() {
    // Generates the message to be shown next to the scaled segment in the analysis pane
    const message = `The original drawing of this symbol has a total of ${
      this.props.originalSegmentsInfo[this.props.selectedSegment].xFields *
      this.props.originalSegmentsInfo[this.props.selectedSegment].yFields
    } pixels, out of which ${
      this.props.originalSegmentsInfo[this.props.selectedSegment].filledFields
    } are non-empty. If the dimensions are too small, the neural network might have difficulties identifying the symbol with precision`;
    return message;
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
        <Typography align="left" variant="caption" component="h2">
          Original segment:{" "}
          {this.props.originalSegmentsInfo[this.props.selectedSegment].xFields}x
          {this.props.originalSegmentsInfo[this.props.selectedSegment].yFields}{" "}
          pixels
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Processed segment:{" "}
          {this.props.curatedSegmentsInfo[this.props.selectedSegment].xFields}x
          {this.props.curatedSegmentsInfo[this.props.selectedSegment].yFields}{" "}
          pixels
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Used pixels:{" "}
          {
            this.props.originalSegmentsInfo[this.props.selectedSegment]
              .filledFields
          }
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Used pixels (processed):{" "}
          {
            this.props.curatedSegmentsInfo[this.props.selectedSegment]
              .filledFields
          }
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          <br />
          {this.getMessage()}
        </Typography>
      </Paper>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    originalSegmentsInfo: state.drawBoardReducer.originalSegmentsInfo,
    curatedSegmentsInfo: state.drawBoardReducer.curatedSegmentsInfo,
    selectedSegment: state.resultPaneReducer.selectedSegment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ImageDetails));
