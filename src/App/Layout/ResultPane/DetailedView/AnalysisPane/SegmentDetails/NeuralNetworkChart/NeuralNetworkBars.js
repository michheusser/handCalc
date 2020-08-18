import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

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
            likelihood: this.props.likelihoods[this.props.selectedSegment][
              index
            ],
          };
        });
    }
    const { classes } = this.props;

    //const formatFunc = (obj) => obj.tickFormat(null, format(".0%"));
    return (
      <Card elevation={0} className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>
          <Chart className={classes.chart} height={180} data={data}>
            <ArgumentAxis />
            <ValueAxis max={7} tickSize={10} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NeuralNetworkBarsUI));
