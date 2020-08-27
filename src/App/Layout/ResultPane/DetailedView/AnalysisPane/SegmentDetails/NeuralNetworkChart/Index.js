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
import { Card, CardContent, Typography } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";
// Diverse
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation, ValueScale } from "@devexpress/dx-react-chart";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  root: {},
  chart: { padding: 0, paddingBottom: theme.spacing(1) },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  pos: {
    marginBottom: 12,
  },
  cardContent: {
    "&:last-child": {
      padding: theme.spacing(0),
    },
  },
});

// **************************** COMPONENT ****************************
class NeuralNetworkChart extends React.Component {
  // Displays the output likelihood of the neural network upon feeding of the selected
  // processed image
  render() {
    let data = [];
    // Puts together the neural network output data to be displayed by the Chart object
    if (this.props.selectedSegment !== null) {
      data = new Array(this.props.outputMap.length)
        .fill(null)
        .map((value, index) => {
          return {
            symbol: this.props.outputMap[index],
            likelihood: this.props.segmentPredictionsInfo[
              this.props.selectedSegment
            ].likelihoods[index],
          };
        });
    }
    const { classes } = this.props;
    //const scale = () => scaleLog().base(2);
    const modifyDomain = (domain) => [0, 1];

    return (
      <Card elevation={0} className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>
          <Chart className={classes.chart} height={220} data={data}>
            <ArgumentAxis />
            <ValueScale modifyDomain={modifyDomain} />
            <ValueAxis showLine={true} />
            <BarSeries
              argumentField="symbol"
              valueField="likelihood"
              color="#3a8a74"
            />
            <Animation />
          </Chart>
        </CardContent>
      </Card>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    outputMap: state.drawBoardReducer.outputMap,
    selectedSegment: state.resultPaneReducer.selectedSegment,
    likelihoods: state.drawBoardReducer.segmentLikelihoods,
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
)(withStyles(useStyles)(NeuralNetworkChart));
