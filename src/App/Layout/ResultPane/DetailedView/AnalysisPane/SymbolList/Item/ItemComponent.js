import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

import SegmentUI from "./Segment/SegmentComponent.js";

import Button from "@material-ui/core/Button";

import { segmentSelected } from "./ItemActions.js";

const useStyles = (theme) => ({
  paper: {
    margin: 0,
    padding: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class ItemUI extends React.Component {
  handleClick(event) {
    this.props.selectSegment(this.props.index);
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper
        className={classes.paper}
        elevation={1}
        aria-describedby={this.props.id}
        color="secondary"
        height={1}
        width={1}
        onClick={this.handleClick.bind(this)}
      >
        <SegmentUI index={this.props.index} />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSegment: (segmentIndex) => {
      dispatch(segmentSelected(segmentIndex));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ItemUI));
