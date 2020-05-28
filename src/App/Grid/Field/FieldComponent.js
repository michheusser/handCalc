// Libraries
import React from "react";
import { connect } from "react-redux";
// Actions
import { fieldClicked } from "./FieldActions";

class FieldUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activated: false };
  }
  toggleField(event) {
    if (event.buttons !== 1) {
      return false;
    }
    if (this.state.activated) {
      this.setState({ activated: false });
      this.props.fieldToggle(false);
    } else {
      this.setState({ activated: true });
      this.props.fieldToggle(true);
    }

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
      background: this.state.activated
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
          onMouseOver={this.toggleField.bind(this)}
          onMouseDown={this.toggleField.bind(this)}
        ></div>
      </td>
    );
  }
}

const mapStatetoProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fieldToggle: (active) => {
      dispatch(fieldClicked(ownProps.x, ownProps.y, active));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(FieldUI);
