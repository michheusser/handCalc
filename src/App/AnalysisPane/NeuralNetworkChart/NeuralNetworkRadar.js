import React from "react";
import { connect } from "react-redux";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveBar } from "@nivo/bar";

class NeuralNetworkRadarUI extends React.Component {
  arrayToData() {
    if (!this.props.data) {
      return [];
    }
    const radarData = [];
    for (let i = 0; i < this.props.data.length; i++) {
      radarData.push({
        symbol: `${this.props.outputMap[i]}`,
        prediction: this.props.data[i],
      });
    }
    console.log(radarData);
    return radarData;
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <ResponsiveRadar
          data={this.arrayToData()}
          keys={["prediction"]}
          indexBy="symbol"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="none"
          dotLabelYOffset={-12}
          colors={{ scheme: "nivo" }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
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

export default connect(mapStateToProps)(NeuralNetworkRadarUI);
