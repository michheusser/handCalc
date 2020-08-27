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
// Material UI (Components)
import { AppBar, Toolbar, Typography, Slide } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  appBar: {
    bottom: 0,
    top: "auto",
  },
});

// **************************** COMPONENT ****************************
class Footer extends React.Component {
  // Component handling the footer. It only displays text and slides off the screen when drawing
  // is happening.
  render() {
    return (
      <Slide
        direction="up"
        in={this.props.show}
        timeout={{ enter: 800, exit: 800 }}
      >
        <AppBar
          position="fixed"
          color="secondary"
          style={{ bottom: 0, top: "auto" }}
        >
          <Toolbar>
            <Typography variant="caption">
              Original work Copyright © 2020 Michel Heusser.
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return { show: state.footerReducer.show };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Footer));
