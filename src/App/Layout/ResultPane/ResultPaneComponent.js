import React from "react";
import { connect } from "react-redux";
import { closePane } from "./ResultPaneActions";
import { withStyles } from "@material-ui/core/styles";
import DetailedViewUI from "./DetailedView/DetailedViewComponent.js";

//

import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = (theme) => ({
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
  dialogContent: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
    padding: theme.spacing(1),
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
    const { classes } = this.props;
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
        <DialogActions>
          <IconButton
            size="small"
            className={classes.iconButton}
            onClick={this.handleClose.bind(this)}
            color="secondary"
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            <DetailedViewUI text={this.props.result} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
    expression: state.resultPaneReducer.predictedExpression,
    result: state.resultPaneReducer.displayedResult,
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

/*  <Button variant="text">
    <Typography variant="h3">
      {this.props.expression} = {this.props.result}
    </Typography>
  </Button>*/

/*<SymbolListUI
    text={this.props.expression + " = " + this.props.result}
  ></SymbolListUI>*/
