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
  processGrid() {
    this.props.process(
      this.props.xFields,
      this.props.yFields,
      this.props.activeFields
    );
  }
  render() {
    let fieldBorder = 1;
    let fieldSize = 10;
    let table = [];
    for (let j = 0; j < this.props.yFields; j++) {
      table.push(
        <tr key={j}>
          {new Array(this.props.xFields).fill(null).map((_, index) => {
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
          <GridToolbarUI processGrid={this.processGrid.bind(this)} />{" "}
        </Segment>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeFields: state.gridReducer.activeFields,
    xFields: state.appReducer.xFields,
    yFields: state.appReducer.yFields,
  };
  //return { filledFields: state.gridReducer.filledFields };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    process: (xFields, yFields, activeFields) =>
      dispatch(processGrid(xFields, yFields, activeFields)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridUI);
