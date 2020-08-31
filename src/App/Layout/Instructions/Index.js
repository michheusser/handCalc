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
import Pane1 from "./Pane1/Index.js";
import Pane2 from "./Pane2/Index.js";
import Pane3 from "./Pane3/Index.js";
import Pane4 from "./Pane4/Index.js";
import Pane5 from "./Pane5/Index.js";
import Pane6 from "./Pane6/Index.js";
import Pane7 from "./Pane7/Index.js";
import Pane8 from "./Pane8/Index.js";
import Pane9 from "./Pane9/Index.js";
import Pane10 from "./Pane10/Index.js";
import Pane11 from "./Pane11/Index.js";
import Pane12 from "./Pane12/Index.js";
import Pane13 from "./Pane13/Index.js";

// Material UI (Components)
import {
  Dialog,
  DialogActions,
  DialogContent,
  MobileStepper,
  Step,
  StepLabel,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
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

  dialogActionsTop: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialogActionsBottom: {
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
  stepper: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },
});

// **************************** FUNCTIONS ****************************

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Pane1 />;
    case 1:
      return <Pane2 />;
    case 2:
      return <Pane3 />;
    case 3:
      return <Pane4 />;
    case 4:
      return <Pane5 />;
    case 5:
      return <Pane6 />;
    case 6:
      return <Pane7 />;
    case 7:
      return <Pane8 />;
    case 8:
      return <Pane9 />;
    case 9:
      return <Pane10 />;
    case 10:
      return <Pane11 />;
    case 11:
      return <Pane12 />;
    case 12:
      return <Pane13 />;
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
    const steps = new Array(13).fill(null).map((_, index) => `Pane${index}`);
    const { classes } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={this.props.open}
        onClose={this.handleClose.bind(this)}
        disableBackdropClick={false}
        aria-labelledby="max-width-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogActions className={classes.dialogActionsTop}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={this.handleClose.bind(this)}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <MobileStepper
          activeStep={this.props.activeStep}
          variant="dots"
          steps={steps.length}
          position="static"
          style={{ justifyContent: "center" }}
        ></MobileStepper>
        <DialogContent>{getStepContent(this.props.activeStep)}</DialogContent>
        <DialogActions className={classes.dialogActionsBottom}>
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
