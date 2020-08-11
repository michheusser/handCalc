import React from "react";
import { connect } from "react-redux";
import { closePane } from "./ResultPaneActions";
import { withStyles } from "@material-ui/core/styles";
import DetailedViewUI from "./DetailedView/DetailedViewComponent.js";

//
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SymbolListUI from "./SymbolList/SymbolListComponent.js";
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
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={this.props.open}
          onClose={this.handleClose.bind(this)}
          disableBackdropClick={false}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="secondary">
              <CloseIcon />
            </Button>
          </DialogActions>
          <DialogContent>
            <DialogContentText>
              <DetailedViewUI text={this.props.result} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
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
