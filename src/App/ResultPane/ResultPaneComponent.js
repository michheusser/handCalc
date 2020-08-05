import React from "react";
import { connect } from "react-redux";
import { closePane } from "./ResultPaneActions";
import { withStyles } from "@material-ui/core/styles";
import ItemUI from "./Item/ItemComponent.js";

//
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = (theme) => ({
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
});

class ResultPaneUI extends React.Component {
  constructor(props) {
    super(props);
    this.contexts = [];
  }
  handleClose() {
    this.props.closePane();
  }
  render() {
    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <ItemUI
            key={idx}
            index={idx}
            selectSegment={this.props.selectSegment}
          />
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
    closePane: () => {
      dispatch(closePane());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ResultPaneUI));
