import React from "react";
import { connect } from "react-redux";
//import { Item } from "semantic-ui-react";

class SegmentListUI extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = [];
    this.contexts = [];
    // Testing
    // this.canvasTestRef = React.createRef();
    // this.elementCanvasTest = null;
    // this.contextTest = null;
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
    //console.log(grid.xFields);
    return new ImageData(imageArray, grid.xFields, grid.yFields);
  }
  updateCanvas() {
    console.log(this.canvas);
    this.contexts = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return this.canvas[idx].getContext("2d");
      });
    console.log("[updateCanvas] this.contexts = ");
    console.log(this.contexts);

    for (let i = 0; i < this.props.segments.length; i++) {
      this.contexts[i].putImageData(
        this.gridToImage(this.props.segments[i], { r: 100, g: 100, b: 100 }),
        0,
        0
      );
    }
  }
  componentDidUpdate() {
    console.log(`[componentDidUpdate] this.canvas = `);
    console.log(this.canvas);
    // console.log(this.canvasTestRef);
    // this.contextTest = this.canvasTestRef.current.getContext("2d");
    // console.log(this.contextTest);

    this.updateCanvas();
  }
  componentDidMount() {
    console.log(`[componentDidMount] this.canvas = `);
    console.log(this.canvas);
    // console.log(this.canvasTestRef);
    // this.contextTest = this.canvasTestRef.current.getContext("2d");
    // console.log(this.contextTest);
    this.updateCanvas();
  }
  render() {
    //console.log(this.gridToImage(this.props.segments[1]));

    /*if (this.props.segments.length > 0) {
      console.log(
        this.gridToImage(this.props.segments[0], { r: 100, g: 100, b: 100 })
      );
    }*/
    /*let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return {
          childKey: idx,
          image: "image.png",
          header: "Header",
          description: "Description",
          meta: "Metadata",
          extra: "Extra",
        };
      });*/

    console.log(`[render start] this.canvas = `);
    console.log(this.canvas);

    this.canvas = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => React.createRef());

    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <div key={idx}>
            <canvas
              width={100}
              height={100}
              style={{ border: "solid black" }}
              ref={(ref) => (this.canvas[idx] = ref)}
            />
          </div>
        );
      });

    console.log(`[render end] this.canvas = `);
    console.log(this.canvas);
    return (
      /*<div>
        <Item.Group items={segmentList} />{" "}
      </div>*/
      <div>{segmentList}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.gridReducer.boardGridSegments,
  };
};

export default connect(mapStateToProps)(SegmentListUI);
