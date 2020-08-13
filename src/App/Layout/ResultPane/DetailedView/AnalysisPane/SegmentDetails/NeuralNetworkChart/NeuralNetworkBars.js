import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { ResponsiveBar } from "@nivo/bar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    minWidth: 275,
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

class NeuralNetworkBarsUI extends React.Component {
  arrayToData() {
    if (!this.props.likelihood) {
      return [];
    }
    const barsData = [];
    for (let i = 0; i < this.props.likelihood.length; i++) {
      barsData.push({
        symbol: `${this.props.outputMap[i]}`,
        prediction: this.props.likelihood[i],
      });
    }
    return barsData;
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Segment Information
          </Typography>
          <div style={{ height: 200, width: 300 }}>
            <ResponsiveBar
              data={this.arrayToData()}
              keys={["prediction"]}
              indexBy="symbol"
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              isInteractive={false}
              minValue={0}
              maxValue={1}
              padding={0.3}
              colors={{ scheme: "nivo" }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "#38bcb2",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "#eed312",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "fries",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "sandwich",
                  },
                  id: "lines",
                },
              ]}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Symbol",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={false}
              enableLabel={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    outputMap: state.resultPaneReducer.outputMap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(NeuralNetworkBarsUI));
