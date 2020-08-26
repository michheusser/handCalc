import React from "react";
import { connect } from "react-redux";
import { closeInstructions, nextStep, backStep, resetStep } from "./Actions";
import { withStyles } from "@material-ui/core/styles";

import Introduction from "./Introduction/Introduction.js";
import Drawing from "./Drawing/Drawing.js";
import Analysis from "./Analysis/Analysis.js";
import Extra from "./Extra/Extra.js";
import End from "./End/End.js";

//import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

//import CloseIcon from "@material-ui/icons/Close";

const useStyles = (theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dialogActions: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  iconButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  closeIcon: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
});

function getSteps() {
  return ["Introduction", "Drawing", "Analysis", "Extra"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Introduction />;
    case 1:
      return <Drawing />;
    case 2:
      return <Analysis />;
    case 3:
      return <Extra />;
    default:
      return "Unknown stepIndex";
  }
}

class Instructions extends React.Component {
  handleClose() {
    this.props.closePane();
  }
  handleNext() {
    this.props.nextStep();
  }

  handleBack() {
    this.props.backStep();
  }

  handleReset() {
    this.props.resetStep();
  }

  render() {
    const steps = getSteps();
    const { classes } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        disableBackdropClick={false}
        aria-labelledby="max-width-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <Stepper activeStep={this.props.activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <DialogContent>{getStepContent(this.props.activeStep)}</DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant="outlined"
            disabled={this.props.activeStep === 0}
            onClick={this.handleBack.bind(this)}
            className={classes.backButton}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={
              this.props.activeStep === steps.length - 1
                ? this.handleClose.bind(this)
                : this.handleNext.bind(this)
            }
          >
            {this.props.activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.instructionsReducer.paneOpen,
    activeStep: state.instructionsReducer.activeStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePane: () => {
      dispatch(closeInstructions());
    },
    nextStep: () => {
      dispatch(nextStep());
    },
    backStep: () => {
      dispatch(backStep());
    },
    resetStep: () => {
      dispatch(resetStep());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Instructions));

/*<DialogActions className={classes.dialogActions}>
  <IconButton
    size="small"
    onClick={this.handleClose.bind(this)}
    className={classes.closeButton}
    color="primary"
  >
    <CloseIcon />
  </IconButton>
</DialogActions>*/

/*<React.Fragment>
  {this.props.activeStep === steps.length ? (
    <React.Fragment>
      <End />
      <Button onClick={this.handleClose.bind(this)}>Close</Button>
    </React.Fragment>
  ) : (
    <React.Fragment>
      {getStepContent(this.props.activeStep)}
      <React.Fragment>
        <Button
          disabled={this.props.activeStep === 0}
          onClick={this.handleBack.bind(this)}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext.bind(this)}
        >
          {this.props.activeStep === steps.length - 1
            ? "Finish"
            : "Next"}
        </Button>
      </React.Fragment>
    </React.Fragment>
  )}
</React.Fragment>*/
