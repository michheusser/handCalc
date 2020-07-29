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
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
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
}));

class HeaderUI extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
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
  return {};
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
