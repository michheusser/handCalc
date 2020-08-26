import React from "react";
import { connect } from "react-redux";
import NeuralNetworkChart from "./NeuralNetworkChart/NeuralNetworkChart";
import NeuralNetworkDetails from "./NeuralNetworkDetails/NeuralNetworkDetails";
import ImageDetails from "./ImageDetails/ImageDetails";
import ScaledImage from "./ScaledImage/ScaledImage";
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

class SegmentDetails extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography align="left" variant="subtitle1">
              Processed Segment
            </Typography>
          </Grid>
          <Grid align="left" item xs={4}>
            <ScaledImage />
          </Grid>
          <Grid item xs={8}>
            <ImageDetails />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography align="left" variant="subtitle1">
              Prediction Analysis
            </Typography>
          </Grid>
          <Grid align="left" item xs={6}>
            <NeuralNetworkChart />
          </Grid>
          <Grid item xs={6}>
            <NeuralNetworkDetails />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    segmentPredictionsInfo: state.gridProcessorReducer.segmentPredictionsInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SegmentDetails));

/*<div height={400}>
  <ImageDetails />
  <ScaledImage />
  <NeuralNetworkDetails />
  <NeuralNetworkChart likelihood={likelihood} prediction={prediction} />
</div>
  */
