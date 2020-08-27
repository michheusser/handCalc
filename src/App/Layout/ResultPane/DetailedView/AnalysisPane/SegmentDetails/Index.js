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
// Components
import NeuralNetworkChart from "./NeuralNetworkChart/Index";
import NeuralNetworkDetails from "./NeuralNetworkDetails/Index";
import ImageDetails from "./ImageDetails/Index";
import ScaledImage from "./ScaledImage/Index";
// Material UI (Components)
import { Grid, Typography } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
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

// **************************** COMPONENT ****************************
class SegmentDetails extends React.Component {
  // Sets out the overall grid layout for the detailed information around the selected segments
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

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    selectedSegment: state.resultPaneReducer.selectedSegment,
    segmentPredictionsInfo: state.drawBoardReducer.segmentPredictionsInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SegmentDetails));
