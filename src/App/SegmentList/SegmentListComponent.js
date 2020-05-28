import React from "react";
import { connect } from "react-redux";
import { segmentSelected } from "./SegmentListActions";

class SegmentListUI extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = [];
    this.contexts = [];
  }
  gridToImage(grid, color) {
    let imageArray = new Uint8ClampedArray(
      grid.xFields * grid.yFields * 4
    ).fill(255);
    for (let i = 0; i < Math.floor(imageArray.length / 4); i++) {
      if (grid.fields[i].isFilled) {
        imageArray[4 * i + 0] = color.r;
        imageArray[4 * i + 1] = color.g;
        imageArray[4 * i + 2] = color.b;
      }
    }
    return new ImageData(imageArray, grid.xFields, grid.yFields);
  }
  updateCanvas() {
    this.contexts = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return this.canvas[idx].getContext("2d");
      });

    for (let i = 0; i < this.props.segments.length; i++) {
      this.contexts[i].putImageData(
        this.gridToImage(this.props.segments[i], { r: 100, g: 100, b: 100 }),
        0,
        0
      );
    }
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  componentDidMount() {
    this.updateCanvas();
  }
  render() {
    this.canvas = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => React.createRef());

    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <div
            key={idx}
            style={{ background: "#CCCCCC", margin: "4px" }}
            onClick={() => this.props.selectSegment(this.props.segments[idx])}
          >
            <canvas
              width={100}
              height={100}
              style={{ border: "thin solid black" }}
              ref={(ref) => (this.canvas[idx] = ref)}
            />
            <button>Discard</button>
          </div>
        );
      });
    return <div>{segmentList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.gridReducer.boardGridSegments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSegment: (segment) => {
      dispatch(segmentSelected(segment));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentListUI);
