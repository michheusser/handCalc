import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//
const useStyles = (theme) => ({
  root: {
    padding: 0,
  },
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    display: "block",
    alignItems: "top",
    justifyContent: "top",
  },
});

class DetailsCardUI extends React.Component {
  render() {
    const { classes } = this.props;
    let predictionLikelihood = null;
    let prediction = null;
    if (this.props.selectedSegment !== null) {
      predictionLikelihood = this.props.predictionLikelihoods[
        this.props.selectedSegment
      ];
      prediction = this.props.predictions[this.props.selectedSegment];
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
          Prediction likelihood = {Math.round(predictionLikelihood * 100)}%
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    likelihoods: state.resultPaneReducer.segmentLikelihoods,
    predictionLikelihoods: state.resultPaneReducer.predictionLikelihoods,
    predictions: state.resultPaneReducer.segmentPredictions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DetailsCardUI));
