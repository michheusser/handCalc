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
  root: {
    padding: 0,
  },
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: 0,
    display: "block",
    alignItems: "top",
    justifyContent: "top",
  },
});

// **************************** COMPONENT ****************************
class NeuralNetworkDetails extends React.Component {
  // Displays the prediction details around the selected segment upon feeding it into the
  // neural network
  getMessage() {
    // Generates the message to be shown next to the neural network output data analysis chart
    return `The neural network identified this symbol with a likelihood of ${Math.round(
      this.props.segmentPredictionsInfo[this.props.selectedSegment]
        .predictionLikelihood * 100
    )}%. If other possible symbols have a comparable likelihood, or the prediction itself is incorrect, please go back to the drawing board and make sure the symbol is more clearly written`;
  }

  render() {
    const { classes } = this.props;
    let predictionLikelihood = null;
    let prediction = null;
    if (this.props.selectedSegment !== null) {
      predictionLikelihood = this.props.segmentPredictionsInfo[
        this.props.selectedSegment
      ].predictionLikelihood;
      prediction = this.props.segmentPredictionsInfo[this.props.selectedSegment]
        .prediction;
    }

    return (
      <Paper
        className={classes.paper}
        elevation={0}
        color="secondary"
        height={1}
        width={1}
      >
        <Typography align="left" variant="caption" component="h2">
          Predicted symbol: {prediction}
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Prediction likelihood = {Math.round(predictionLikelihood * 100)}%
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
    segmentPredictionsInfo: state.drawBoardReducer.segmentPredictionsInfo,
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
)(withStyles(useStyles)(NeuralNetworkDetails));
