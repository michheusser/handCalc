// Libraries
import React from "react";
import { connect } from "react-redux";
import { changeField } from "./FieldActions.js";
// Actions

class FieldUI extends React.Component {
  toggleTouch(event) {
    event.persist();
    event.preventDefault();
  }
  toggle(event) {
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
    let styleCell = {
      border: `${this.props.border}px solid #CCCCCC`,
      padding: "0",
    };
    let styleSquare = {
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

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.gridLayoutReducer.fields[ownProps.x][ownProps.y],
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeField: (isFilled) => {
      dispatch(changeField(ownProps.x, ownProps.y, isFilled));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldUI);

//
