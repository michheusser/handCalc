// Libraries
import React from "react";
// Actions

class FieldUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
  }
  toggle(event) {
    if (event.buttons !== 1) {
      return false;
    }
    if (this.state.active) {
      this.setState({ active: false });
      this.props.setFieldActive(false);
    } else {
      this.setState({ active: true });
      this.props.setFieldActive(true);
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
      background: this.state.active
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

export default FieldUI;
