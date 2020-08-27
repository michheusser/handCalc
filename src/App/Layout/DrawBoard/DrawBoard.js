/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import { connect } from "react-redux";
import { mouseDown, mouseUp } from "./Actions";
import { Box } from "@material-ui/core";
import Field from "./Field/Field";

class DrawBoard extends React.Component {
  render() {
    let table = [];
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
          draggable="false"
        >
          <tbody draggable="false">{table}</tbody>
        </table>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    xFields: state.gridLayoutReducer.widthFields,
    yFields: state.gridLayoutReducer.heightFields,
    fieldSize: state.gridLayoutReducer.fieldSize,
    fieldBorder: state.gridLayoutReducer.fieldBorder,
    marginLeft: state.gridLayoutReducer.marginLeft,
    marginTop: state.gridLayoutReducer.marginTop,
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawBoard);

//<Button onClick={this.processGrid.bind(this)}>Button</Button>
