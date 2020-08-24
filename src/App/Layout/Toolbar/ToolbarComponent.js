import React from "react";
import { connect } from "react-redux";
import { goClicked } from "./ToolbarActions.js";
import { AppBar, Toolbar, Typography, Button, Slide } from "@material-ui/core";
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

class ToolbarUI extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Slide
          direction="down"
          in={this.props.show}
          timeout={{ enter: 800, exit: 800 }}
        >
          <AppBar position="fixed" color="primary">
            <Toolbar>
              <MenuUI />
              <Typography variant="h6" className={classes.title}>
                handCalc
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.goClicked}
              >
                Start
              </Button>
            </Toolbar>
          </AppBar>
        </Slide>
      </div>
    );
  }
}
//<div className={classes.toolbarMargin}></div>;

const mapStateToProps = (state) => {
  return {
    show: state.headerFooterReducer.show,
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
)(withStyles(useStyles)(ToolbarUI));

/*            <Backdrop
              className={classes.backdrop}
              open={this.props.processOngoing}
            >
              <CircularProgress color="inherit" />
            </Backdrop>*/
