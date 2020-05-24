// Libraries
import React from "react";
import { connect } from "react-redux";
// Actions
import { toggleField } from "./FieldActions";

class FieldUI extends React.Component {
  render() {
    let styleCell = {
      border: `${this.props.border}px solid lightblue`,
      padding: "0",
    };
    let styleSquare = {
      height: `${this.props.fieldSize}px`,
      width: `${this.props.fieldSize}px`,
      background: `${this.props.background}`,
      border: "none",
      padding: "0",
      margin: "0",
    };
    return (
      <td style={styleCell}>
        <div style={styleSquare}> </div>
      </td>
    );
  }
}
export default FieldUI;
