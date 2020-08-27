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
import { closeInstructions, nextStep, backStep, resetStep } from "./Actions";
// Components
import Introduction from "./Introduction/Index.js";
import Drawing from "./Drawing/Index.js";
import Analysis from "./Analysis/Index.js";
import Extra from "./Extra/Index.js";
import End from "./End/Index.js";
// Material UI (Components)
import {
  Dialog,
  DialogActions,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
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

// **************************** FUNCTIONS ****************************
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

// **************************** COMPONENT ****************************
class Instructions extends React.Component {
  // Handles the instructions pane shown when the web-app is loaded, or accessed through the menu.
  handleClose() {
    // Dispatches the action to close the pane
    this.props.closePane();
  }
  handleNext() {
    // Dispatches the action to go to the next step
    this.props.nextStep();
  }

  handleBack() {
    // Dispatches the action to go to the previous step
    this.props.backStep();
  }

  handleReset() {
    // Dispatches the action to go to the first step
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

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
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

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Instructions));
