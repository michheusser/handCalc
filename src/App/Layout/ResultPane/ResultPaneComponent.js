import React from "react";
import { connect } from "react-redux";
import { openPane, closePane, segmentSelected } from "./ResultPaneActions";
import { withStyles } from "@material-ui/core/styles";
import DetailedViewUI from "./DetailedView/DetailedViewComponent.js";

//

import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";

import CloseIcon from "@material-ui/icons/Close";

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

class ResultPaneUI extends React.Component {
  handleClose() {
    this.props.closePane();
  }
  setSelectedSegment() {
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
          <DetailedViewUI />
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segmentsLength: state.gridProcessorReducer.originalSegmentsInfo.length,
    open: state.analysisPaneReducer.paneOpen,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ResultPaneUI));
