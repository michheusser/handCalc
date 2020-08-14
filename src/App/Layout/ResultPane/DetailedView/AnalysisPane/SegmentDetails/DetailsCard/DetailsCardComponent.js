import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//
const useStyles = (theme) => ({
  root: {
    padding: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
      <Card elevation={0} className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>
          <Typography align="left" variant="body2" component="h2">
            Predicted symbol: {prediction}
          </Typography>
          <Typography align="left" variant="body2" component="h2">
            Prediction likelihood = {Math.round(predictionLikelihood * 100)}%
          </Typography>
          <Typography align="left" variant="body2" component="h2">
            Prediction likelihood = {Math.round(predictionLikelihood * 100)}%
          </Typography>
        </CardContent>
      </Card>
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
