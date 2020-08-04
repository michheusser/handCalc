import { connect } from "react-redux";
import * as React from "react";
import Paper from "@material-ui/core/Paper";

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

const data = [
  { argument: 1, value: 1 },
  { argument: 2, value: 4 },
  { argument: 3, value: 9 },
];

class AnalysisPaneUI extends React.Component {
  render() {
    return (
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalysisPaneUI);
