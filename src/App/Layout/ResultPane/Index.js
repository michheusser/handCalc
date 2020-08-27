/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
// Redux (State Management)
import { connect } from "react-redux";
// Actions
import { openPane, closePane, segmentSelected } from "./Actions";
// Components
import DetailedView from "./DetailedView/Index.js";
// Material UI (Components)
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  closeButton: {
    minWidth: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(0),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(0),
  },
  closeIcon: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  iconButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialog: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialogActions: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialogContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
});

// **************************** COMPONENT ****************************
class ResultPane extends React.Component {
  // Handles the container dialog that appears when the grid has been processed to show the
  // predicted result and the details
  handleClose() {
    // Dispatches the action to close the result pane
    this.props.closePane();
  }
  setSelectedSegment() {
    // Dispatches the action to change the selected segment
    if (this.props.segmentsLength) {
      this.props.selectSegment(0);
    }
  }
  render() {
    const { classes } = this.props;
    this.setSelectedSegment();

    return (
      <Dialog
        className={classes.dialog}
        fullWidth={true}
        maxWidth={"sm"}
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        disableBackdropClick={false}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogActions className={classes.dialogActions}>
          <IconButton
            size="small"
            className={classes.closeButton}
            onClick={this.handleClose.bind(this)}
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogContent}>
          <DetailedView />
        </DialogContent>
      </Dialog>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    segmentsLength: state.drawBoardReducer.originalSegmentsInfo.length,
    open: state.resultPaneReducer.paneOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openPane: () => {
      dispatch(openPane());
    },
    closePane: () => {
      dispatch(closePane());
    },
    selectSegment: (selectedSegmentIndex) => {
      dispatch(segmentSelected(selectedSegmentIndex));
    },
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ResultPane));
