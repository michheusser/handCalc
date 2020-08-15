import React from "react";
import { connect } from "react-redux";
import NeuralNetworkBarsUI from "./NeuralNetworkChart/NeuralNetworkBars";
import DetailsCardUI from "./DetailsCard/DetailsCardComponent";
import ImageDetailsUI from "./ImageDetails/ImageDetailsComponent";
import ScaledImageUI from "./ScaledImage/ScaledImageComponent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

class SegmentDetailsUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    let likelihood = null;
    let prediction = null;
    if (this.props.selectedSegment !== null) {
      likelihood = this.props.likelihoods[this.props.selectedSegment];
      prediction = this.props.predictions[this.props.selectedSegment];
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography align="left" variant="subtitle1">
              Processed Segment
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <ScaledImageUI />
          </Grid>
          <Grid item xs={8}>
            <ImageDetailsUI />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography align="left" variant="subtitle1">
              Prediction Analysis
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <NeuralNetworkBarsUI
              likelihood={likelihood}
              prediction={prediction}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsCardUI />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    likelihoods: state.resultPaneReducer.segmentLikelihoods,
    predictions: state.resultPaneReducer.segmentPredictions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SegmentDetailsUI));

/*<div height={400}>
  <ImageDetailsUI />
  <ScaledImageUI />
  <DetailsCardUI />
  <NeuralNetworkBarsUI likelihood={likelihood} prediction={prediction} />
</div>
  */
