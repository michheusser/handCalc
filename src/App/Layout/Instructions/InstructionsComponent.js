import React from "react";
import { connect } from "react-redux";
import { closeInstructions } from "./InstructionsActions";
import { withStyles } from "@material-ui/core/styles";

import IntroductionUI from "./Introduction/IntroductionComponent.js";
import DrawingUI from "./Drawing/DrawingComponent.js";
import AnalysisUI from "./Analysis/AnalysisComponent.js";
import ExtraUI from "./Extra/ExtraComponent.js";
import EndUI from "./End/EndComponent.js";

//import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

//import CloseIcon from "@material-ui/icons/Close";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dialogActions: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  iconButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  closeIcon: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
});

function getSteps() {
  return ["Introduction", "Drawing", "Analysis", "Extra"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <IntroductionUI />;
    case 1:
      return <DrawingUI />;
    case 2:
      return <AnalysisUI />;
    case 3:
      return <ExtraUI />;
    default:
      return "Unknown stepIndex";
  }
}

class InstructionsUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeStep: 0 };
  }
  handleClose() {
    this.props.closePane();
  }
  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  handleReset() {
    this.setState({ activeStep: 0 });
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
      >
        <DialogContent>
          <React.Fragment>
            <Stepper
              className={classes.root}
              activeStep={this.state.activeStep}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <EndUI />
                  <Button onClick={this.handleClose.bind(this)}>Close</Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(this.state.activeStep)}
                  <React.Fragment>
                    <Button
                      disabled={this.state.activeStep === 0}
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
                      {this.state.activeStep === steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </React.Fragment>
                </React.Fragment>
              )}
            </React.Fragment>
          </React.Fragment>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.instructionsReducer.paneOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePane: () => {
      dispatch(closeInstructions());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(InstructionsUI));

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
