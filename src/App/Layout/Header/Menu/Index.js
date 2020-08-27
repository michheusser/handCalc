/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonIcon from "@material-ui/icons/Person";
import { openInstructions, openAbout } from "./Actions.js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  }

  toggleDrawer(anchor, open) {
    return (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      this.setState({ ...this.state, [anchor]: open });
    };
  }

  render() {
    const { classes } = this.props;
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={this.toggleDrawer(anchor, false)}
        onKeyDown={this.toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem
            button
            key={"Instructions"}
            onClick={(event) => {
              this.props.openInstructions();
            }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Instructions"} />
          </ListItem>

          <ListItem
            button
            key={"GitHub"}
            onClick={(event) =>
              (window.location.href =
                "https://github.com/michheusser/symbol-neural-network")
            }
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"GitHub Repository"} />
          </ListItem>
          <ListItem
            button
            key={"About"}
            onClick={(event) => {
              this.props.openAbout();
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
          <Divider />
        </List>
      </div>
    );

    return (
      <div>
        <React.Fragment key={"left"}>
          <IconButton
            onClick={this.toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor={"left"}
            open={this.state["left"]}
            onClose={this.toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    openInstructions: () => {
      dispatch(openInstructions());
    },
    openAbout: () => {
      dispatch(openAbout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Menu));
