/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
// Redux (State Management)
import { connect } from "react-redux";
// Actions
import { mouseDown, mouseUp } from "./Actions";
// Components
import Field from "./Field/Index";
// Material UI (Components)
import { Box } from "@material-ui/core";

// **************************** COMPONENT ****************************
class DrawBoard extends React.Component {
  // Component handling the draw board (grid), composed of all clickable field components.
  // The grid is rerendered everytime the window is resized.
  render() {
    let table = [];
    // Creates the table containing the fields of the drawing board
    for (let y = 0; y < this.props.yFields; y++) {
      table.push(
        <tr key={y}>
          {new Array(this.props.xFields).fill(null).map((_, x) => {
            return (
              <Field
                key={`ID${y}&${x}`}
                fieldSize={this.props.fieldSize}
                border={this.props.fieldBorder}
                x={x}
                y={y}
                backgroundActivated={"grey"}
                background={"white"}
              />
            );
          })}
        </tr>
      );
    }
    return (
      <Box
        draggable="false"
        style={{
          display: "flex",
          justify: "center",
          touchAction: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            margin: 0,
            padding: 0,
            top: this.props.marginTop,
            left: this.props.marginLeft,
            position: "absolute",
          }}
          onMouseDown={this.props.mouseDown}
          onMouseUp={this.props.mouseUp}
          onTouchStart={this.props.mouseDown}
          onTouchEnd={this.props.mouseUp}
          onKeyDown={(event) => console.log(event)}
          draggable="false"
        >
          <tbody draggable="false">{table}</tbody>
        </table>
      </Box>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    xFields: state.layoutReducer.widthFields,
    yFields: state.layoutReducer.heightFields,
    fieldSize: state.layoutReducer.fieldSize,
    fieldBorder: state.layoutReducer.fieldBorder,
    marginLeft: state.layoutReducer.marginLeft,
    marginTop: state.layoutReducer.marginTop,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    mouseDown: () => {
      dispatch(mouseDown());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);
