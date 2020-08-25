import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import { formatPrefix } from "d3-format";
//import { scaleLog } from "d3-scale";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation, ValueScale } from "@devexpress/dx-react-chart";

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

class NeuralNetworkBarsUI extends React.Component {
  render() {
    let data = [];
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

const mapStateToProps = (state) => {
  return {
    outputMap: state.gridProcessorReducer.outputMap,
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    likelihoods: state.gridProcessorReducer.segmentLikelihoods,
    segmentPredictionsInfo: state.gridProcessorReducer.segmentPredictionsInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NeuralNetworkBarsUI));
