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
import { closeAbout } from "./Actions";
// Material UI (Components)
import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core/";
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
class About extends React.Component {
  // Component displaying project and license information (accessed through the app menu).
  // No functionalities besides showing text and links.
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
          <Typography align="center" variant="h5" component="h2">
            About
          </Typography>

          <Typography align="center" variant="body2" component="h2">
            <br />
            Project's Main Repository:
            <br />
            <a
              href="https://github.com/michheusser/symbol-neural-network"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/michheusser/symbol-neural-network
            </a>
            <br />
            <br />
            Machine Learning, Image Processing, and Dataset Creation libraries:
            <br />
            <a
              href="https://github.com/michheusser/neural-network-training"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/michheusser/neural-network-training
            </a>
            <br />
            <br />
            Handwritten symbol dataset:
            <br />
            <a
              href="https://www.kaggle.com/michelheusser/handwritten-digits-and-operators"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.kaggle.com/michelheusser/handwritten-digits-and-operators
            </a>
            <br />
            <br />
            Author's GitHub Profile:
            <br />
            <a
              href="https://github.com/michheusser"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/michheusser
            </a>
            <br />
            <br />
            Special thanks to Briana Seiderman for her collaboration and
            improvement of the User Design and User Experience:
            <br />
            <a
              href="https://www.brianaseiderman.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.brianaseiderman.com/
            </a>
            <br />
            <br />
            <br />
          </Typography>
          <Typography align="left" variant="caption" component="h2">
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions: The below copyright notice and
            this permission notice shall be included in all copies or
            substantial portions of the Software.
            <br />
            <br />
            Original work Copyright © 2020 Michel Heusser.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    open: state.aboutReducer.paneOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePane: () => {
      dispatch(closeAbout());
    },
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(About));
