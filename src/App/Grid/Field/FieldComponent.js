// Libraries
import React from "react";
import { connect } from "react-redux";
// Actions
import { fieldClicked } from "./FieldActions";

class FieldUI extends React.Component {
  /*toggleField(event) {
    /*if (event.buttons !== 1) {
      return false;
    }
    if (this.props.active) {
      this.setState({ activated: false });
      this.props.fieldToggle(false);
    } else {
      this.setState({ activated: true });
      this.props.fieldToggle(true);
    }*/
  toggle(event) {
    if (event.buttons !== 1) {
      return false;
    }
    this.props.fieldToggle();
    return true;
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
      <td style={styleCell}>
        <div
          style={styleSquare}
          onMouseOver={this.toggle.bind(this)}
          onMouseDown={this.toggle.bind(this)}
        ></div>
      </td>
    );
  }
}

const mapStatetoProps = (state, ownProps) => {
  let active = false;

  if (
    state.gridReducer.activeFields.find((field) => {
      return field[0] === ownProps.x && field[1] === ownProps.y;
    })
  ) {
    active = true;
  }
  return { active: active };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fieldToggle: () => {
      dispatch(fieldClicked(ownProps.x, ownProps.y));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(FieldUI);
