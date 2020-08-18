import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//
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

class DetailsCardUI extends React.Component {
  getMessage() {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  }
  standardDeviation(likelihood) {
    let average = 0;
    for (let i = 0; i < likelihood.length; i++) {
      average += i * likelihood[i];
    }
    average = average / likelihood.length;
    let variance = 0;
    for (let i = 0; i < likelihood.length; i++) {
      variance += Math.pow(i - average, 2) * likelihood[i];
    }
    variance = Math.sqrt(variance);
    return variance;
  }
  render() {
    const { classes } = this.props;
    let predictionLikelihood = null;
    let prediction = null;
    let stdDeviation = null;
    if (this.props.selectedSegment !== null) {
      predictionLikelihood = this.props.predictionLikelihoods[
        this.props.selectedSegment
      ];
      prediction = this.props.predictions[this.props.selectedSegment];
      stdDeviation = this.standardDeviation(
        this.props.likelihoods[this.props.selectedSegment]
      );
    }

    return (
      <Paper
        className={classes.paper}
        elevation={0}
        color="secondary"
        height={1}
        width={1}
      >
        <Typography align="left" variant="body2" component="h2">
          Predicted symbol: {prediction}
        </Typography>
        <Typography align="left" variant="body2" component="h2">
          Prediction likelihood = {Math.round(predictionLikelihood * 100)}%
        </Typography>
        <Typography align="left" variant="body2" component="h2">
          Standard deviation = {stdDeviation}
        </Typography>
        <Typography align="left" variant="body2" component="h2">
          {this.getMessage()}
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    likelihoods: state.gridProcessorReducer.segmentLikelihoods,
    predictionLikelihoods: state.gridProcessorReducer.predictionLikelihoods,
    predictions: state.gridProcessorReducer.segmentPredictions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DetailsCardUI));
