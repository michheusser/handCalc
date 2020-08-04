import React from "react";
import { connect } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";

class NeuralNetworkBarsUI extends React.Component {
  arrayToData() {
    if (!this.props.data) {
      return [];
    }
    const barsData = [];
    for (let i = 0; i < this.props.data.length; i++) {
      barsData.push({
        symbol: `${this.props.outputMap[i]}`,
        //prediction: Math.log(this.props.data[i]),
        prediction: this.props.data[i],
      });
    }
    return barsData;
  }

  render() {
    return (
      <div style={{ height: 400, width: 400 }}>
        <ResponsiveBar
          data={this.arrayToData()}
          keys={["prediction"]}
          indexBy="symbol"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Predicted Likelihood",
            legendPosition: "middle",
            legendOffset: -40,
          }}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    outputMap: state.predictorReducer.outputMap,
  };
};

export default connect(mapStateToProps)(NeuralNetworkBarsUI);
