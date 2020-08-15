import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { formatPrefix, format } from "d3-format";

import { Animation } from "@devexpress/dx-react-chart";

const useStyles = (theme) => ({
  root: {},
  chart: { padding: 0 },
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
  cardContent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1),
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

    const formatFunc = (obj) => obj.tickFormat(null, format(".0%"));
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
    outputMap: state.resultPaneReducer.outputMap,
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    likelihoods: state.resultPaneReducer.segmentLikelihoods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NeuralNetworkBarsUI));
