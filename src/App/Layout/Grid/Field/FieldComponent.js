// Libraries
import React from "react";
// Actions

class FieldUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
  }
  componentWillMount() {}
  toggle(event) {
    event.persist();
    if (event.buttons === 1) {
      event.preventDefault();
      this.setState({ active: true });
      this.props.setFieldActive(true);
    } else if (event.buttons === 2) {
      event.preventDefault();
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
          onTouchStart={this.toggle.bind(this)}
          onTouchMove={this.toggle.bind(this)}
          onContextMenu={(event) => event.preventDefault()}
        ></div>
      </td>
    );
  }
}

export default FieldUI;

//
