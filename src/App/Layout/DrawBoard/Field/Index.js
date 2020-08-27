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
import { changeField } from "./Actions.js";

// **************************** COMPONENT ****************************
class Field extends React.Component {
  // FIeld components out of which the drawing board is composed from. Fields that are clicked
  // update the state of the gridboard in the layout reducer.
  toggleTouch(event) {
    // Handles touch commands.
    // Under construction...
    event.persist();
    event.preventDefault();
  }
  toggle(event) {
    // Handles toggling of the field within the drawing board and dispatches the change field
    // event to update the layout reducer state
    event.persist();
    if (event.buttons === 1) {
      event.preventDefault();
      this.props.changeField(true);
    } else if (event.buttons === 2) {
      event.preventDefault();
      this.props.changeField(false);
    }
  }
  render() {
    const styleCell = {
      border: `${this.props.border}px solid #CCCCCC`,
      padding: "0",
    };
    const styleSquare = {
      height: `${this.props.fieldSize}px`,
      width: `${this.props.fieldSize}px`,
      background: this.props.active
        ? `${this.props.backgroundActivated}`
        : `${this.props.background}`,
      border: "none",
      padding: "0",
      margin: "0",
    };
    return (
      <td style={styleCell} draggable="false">
        <div
          draggable="false"
          style={styleSquare}
          onMouseOver={this.toggle.bind(this)}
          onMouseDown={this.toggle.bind(this)}
          onTouchStart={this.toggleTouch.bind(this)}
          onTouchMove={this.toggleTouch.bind(this)}
          onContextMenu={(event) => event.preventDefault()}
        ></div>
      </td>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state, ownProps) => {
  return {
    active: state.layoutReducer.fields[ownProps.x][ownProps.y],
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeField: (isFilled) => {
      dispatch(changeField(ownProps.x, ownProps.y, isFilled));
    },
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(mapStateToProps, mapDispatchToProps)(Field);
