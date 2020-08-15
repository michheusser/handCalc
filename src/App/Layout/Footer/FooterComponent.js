import React from "react";
import { AppBar, Toolbar, Typography, Slide } from "@material-ui/core";
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
      <Slide
        direction="up"
        in={this.props.show}
        timeout={{ enter: 800, exit: 800 }}
      >
        <AppBar
          position="fixed"
          color="primary"
          style={{ bottom: 0, top: "auto" }}
        >
          <Toolbar>
            <Typography variant="caption">
              All rights reserved. Michel Heusser, 2020
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
    );
  }
}

const mapStateToProps = (state) => {
  return { show: state.headerFooterReducer.show };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(FooterUI));
