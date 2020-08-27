/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import { connect } from "react-redux";
import { closeAbout } from "./Actions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Link from "@material-ui/core/Link";

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

class About extends React.Component {
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
            <Link href="https://github.com/michheusser/symbol-neural-network">
              https://github.com/michheusser/symbol-neural-network
            </Link>
            <br />
            <br />
            Machine Learning, Image Processing, and Dataset Creation libraries:
            <br />
            <Link href="https://github.com/michheusser/neural-network-training">
              https://github.com/michheusser/neural-network-training
            </Link>
            <br />
            <br />
            Handwritten symbol dataset:
            <br />
            <Link href="https://www.kaggle.com/michelheusser/handwritten-digits-and-operators">
              https://www.kaggle.com/michelheusser/handwritten-digits-and-operators
            </Link>
            <br />
            <br />
            Author's GitHub Profile:
            <br />
            <Link href="https://github.com/michheusser">
              https://github.com/michheusser
            </Link>
            <br />
            <br />
            Special thanks to Briana Seiderman for her collaboration and
            improvement of the User Design and User Experience:
            <br />
            <Link href="https://www.brianaseiderman.com/">
              https://www.brianaseiderman.com/
            </Link>
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
//<DetailedView />

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(About));
