import React from "react";
import { connect } from "react-redux";
import { goClicked } from "./HeaderActions.js";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MenuUI from "./Menu/MenuComponent.js";
//import Backdrop from "@material-ui/core/Backdrop";
//import CircularProgress from "@material-ui/core/CircularProgress";

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

class HeaderUI extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <MenuUI />
            <Typography variant="h6" className={classes.title}>
              handCalc
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.goClicked}
            >
              Go!
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
//<div className={classes.toolbarMargin}></div>;

const mapStateToProps = (state) => {
  return {
    processOngoing: state.headerReducer.goCLicked,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goClicked: () => {
      dispatch(goClicked());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HeaderUI));

/*            <Backdrop
              className={classes.backdrop}
              open={this.props.processOngoing}
            >
              <CircularProgress color="inherit" />
            </Backdrop>*/
