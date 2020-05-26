import React from "react";
import { connect } from "react-redux";

class SegmentListUI extends React.Component {
  render() {
    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return <div key={idx}>this.props.segments[idx].toString()</div>;
      });
    return <div> {segmentList} </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.gridReducer.boardGridSegments,
  };
};

export default connect(mapStateToProps)(SegmentListUI);
