import React from "react";
import { processGrid } from "./GridToolbarActions";
import { connect } from "react-redux";

class GridToolbarUI extends React.Component {
  render() {
    return (
      <div>
        {" "}
        <button onClick={this.props.process}>Process</button>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    process: () => dispatch(processGrid(111, 44)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridToolbarUI);
