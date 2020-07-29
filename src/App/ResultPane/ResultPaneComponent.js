import React from "react";
import { connect } from "react-redux";
import { segmentSelected } from "./ResultPaneActions";
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
  handleClickOpen() {}

  handleClose() {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={true}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Dialog Title</DialogTitle>
          <DialogContent>
            <DialogContentText>Here the content!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ResultPaneUI));

/*
<Button variant="outlined" color="primary" onClick={handleClickOpen}>
  Open max-width dialog
</Button>
*/
