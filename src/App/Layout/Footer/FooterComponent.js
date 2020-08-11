import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = (theme) => ({
  appBar: {
    bottom: 0,
    top: "auto",
  },
});

class FooterUI extends React.Component {
  render() {
    return (
      <AppBar color="primary" style={{ bottom: 0, top: "auto" }}>
        <Toolbar>
          <Typography variant="caption">
            All rights reserved. Michel Heusser, 2020
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(FooterUI));
