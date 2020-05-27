import React from "react";

class GridToolbarUI extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <button onClick={this.props.processGrid}>Process</button>{" "}
      </div>
    );
  }
}

export default GridToolbarUI;
