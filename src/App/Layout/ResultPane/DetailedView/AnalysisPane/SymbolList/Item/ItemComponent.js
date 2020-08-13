import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import SegmentUI from "./Segment/SegmentComponent.js";

import Button from "@material-ui/core/Button";

import { segmentSelected } from "./ItemActions.js";

const useStyles = (theme) => ({
  button: {
    margin: 0,
    padding: 0,
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
      <Button
        className={classes.button}
        aria-describedby={this.props.id}
        variant="outlined"
        color="secondary"
        height={1}
        width={1}
        onClick={this.handleClick.bind(this)}
      >
        <SegmentUI index={this.props.index} />
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  return { segments: state.resultPaneReducer.boardGridSegments };
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
