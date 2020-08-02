import React from "react";
import { connect } from "react-redux";
import { segmentSelected, closePane } from "./ResultPaneActions";
import { withStyles } from "@material-ui/core/styles";

//
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

class ResultPaneUI extends React.Component {
  constructor(props) {
    super(props);
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
  updateCanvas(ref, idx) {
    if (this.props.open) {
      this.contexts[idx] = ref.getContext("2d");
      this.contexts[idx].putImageData(
        this.gridToImage(this.props.segments[idx], { r: 100, g: 100, b: 100 }),
        0,
        0
      );
    }
  }
  handleClose() {
    this.props.closePane();
  }
  render() {
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
              ref={(ref) => {
                this.updateCanvas(ref, idx);
              }}
            />
          </div>
        );
      });
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={this.props.open}
          onClose={this.handleClose.bind(this)}
          disableBackdropClick={false}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Dialog Title</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {" "}
              <div>
                <div>Expression: {this.props.expression}</div>
                <div>Result: {this.props.result}</div>
              </div>
              <div>{segmentList}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
    segments: state.resultPaneReducer.boardGridSegments,
    expression: state.resultPaneReducer.predictedExpression,
    result: state.resultPaneReducer.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSegment: (segment) => {
      dispatch(segmentSelected(segment));
    },
    closePane: () => {
      dispatch(closePane());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPaneUI);
