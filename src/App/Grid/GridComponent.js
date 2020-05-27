// Libraries
import React from "react";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { processGrid } from "./GridActions";
// Actions
// Components
import FieldUI from "./Field/FieldComponent";
import GridToolbarUI from "./GridToolbar/GridToolbarComponent";

class GridUI extends React.Component {
  render() {
    let [xFields, yFields] = [this.props.xFields, this.props.yFields];
    let fieldBorder = 1;
    let fieldSize = 10;
    let table = [];
    for (let j = 0; j < yFields; j++) {
      table.push(
        <tr key={j}>
          {new Array(xFields).fill(null).map((_, index) => {
            return (
              <FieldUI
                key={`ID${j}&${index}`}
                fieldSize={fieldSize}
                border={fieldBorder}
                x={index}
                y={j}
                backgroundActivated={"grey"}
                background={"white"}
              />
            );
          })}
        </tr>
      );
    }
    return (
      <div style={{ padding: "0", margin: "0", overflow: "hidden" }}>
        <table
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            margin: "0",
            padding: "0",
            position: "absolute",
          }}
        >
          <tbody>{table}</tbody>
        </table>
        <Segment
          raised
          style={{ right: "0", bottom: "0", position: "absolute" }}
        >
          {" "}
          <GridToolbarUI processGrid={this.props.process.bind(this)} />{" "}
        </Segment>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
  //return { filledFields: state.gridReducer.filledFields };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    process: () => dispatch(processGrid(ownProps.xFields, ownProps.yFields)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridUI);
