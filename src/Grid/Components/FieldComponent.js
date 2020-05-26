// Libraries
import React from "react";
//import { connect } from "react-redux";
// Actions
//import { toggleField } from "./FieldActions";

class FieldUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activated: false };
  }
  toggleField() {
    if (this.state.activated) {
      this.setState({ activated: false });
    } else {
      this.setState({ activated: true });
    }
  }
  render() {
    let styleCell = {
      border: `${this.props.border}px solid lightblue`,
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
          onMouseDown={this.toggleField.bind(this)}
        ></div>
      </td>
    );
  }
}
export default FieldUI;
/*
const mapStatetoProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleField: () => {
      dispatch(toggleField(ownProps.x, ownProps.y));
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(FieldUI);
*/
