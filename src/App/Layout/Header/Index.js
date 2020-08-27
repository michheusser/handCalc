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
import { processGrid, clearGrid } from "./Actions.js";
// Components
import Menu from "./Menu/Index.js";
// Material UI (Components)
import { AppBar, Toolbar, Typography, Button, Slide } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

// **************************** COMPONENT ****************************
class Header extends React.Component {
  // Handles the header component which contains the menu and the buttons to process and
  // clear the grid. It slides off the screen when drawing on the drawboard is happening
  handleStart() {
    // Dispatches the action with the drawing or the drawboard reducer to process it
    this.props.processGrid(
      this.props.xFields,
      this.props.yFields,
      this.props.fields
    );
  }
  handleClear() {
    // Clears the grid
    this.props.clearGrid();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Slide
          direction="down"
          in={this.props.show}
          timeout={{ enter: 800, exit: 800 }}
        >
          <AppBar position="fixed" color="primary" elevation={0}>
            <Toolbar>
              <Menu />
              <Typography variant="h6" className={classes.title}>
                handCalc
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleStart.bind(this)}
                disabled={this.props.buttonDisabled}
              >
                Start
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleClear.bind(this)}
                disabled={this.props.buttonDisabled}
              >
                Clear
              </Button>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    show: state.headerReducer.show,
    fields: state.layoutReducer.fields,
    xFields: state.layoutReducer.widthFields,
    yFields: state.layoutReducer.heightFields,
    buttonDisabled: state.layoutReducer.emptyGrid,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processGrid: (xFields, yFields, fields) => {
      dispatch(processGrid(xFields, yFields, fields));
    },
    clearGrid: () => {
      dispatch(clearGrid());
    },
  };
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Header));
