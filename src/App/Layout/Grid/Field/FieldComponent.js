// Libraries
import React from "react";
// Actions

class FieldUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
  }
  toggle2(event) {
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
  toggle(event) {
    if (event.buttons === 1) {
      this.setState({ active: true });
      this.props.setFieldActive(true);
    } else if (event.buttons === 2) {
      this.setState({ active: false });
      this.props.setFieldActive(false);
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
      <td style={styleCell} draggable="false">
        <div
          draggable="false"
          style={styleSquare}
          onMouseOver={this.toggle.bind(this)}
          onMouseDown={this.toggle.bind(this)}
          onContextMenu={(event) => event.preventDefault()}
        ></div>
      </td>
    );
  }
}

export default FieldUI;
