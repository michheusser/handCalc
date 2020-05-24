// Libraries
import React from "react";
import { connect } from "react-redux";
// Actions
import { toggleField } from "./GridActions";
import FieldUI from "./Components/FieldComponent";

class GridUI extends React.Component {
  render() {
    let xFields = 11;
    let yFields = 4;
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
                background={
                  this.props.gridBoard.getField(index, j).isFilled
                    ? "grey"
                    : "white"
                }
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
            position: "relative",
          }}
        >
          <tbody>{table}</tbody>
        </table>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { gridBoard: state.boardGrid };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleField: (x, y) => {
      dispatch(toggleField(x, y));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(GridUI);
