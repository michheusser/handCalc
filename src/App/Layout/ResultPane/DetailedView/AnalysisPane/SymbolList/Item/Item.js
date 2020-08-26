import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import SegmentUI from "./Segment/Segment.js";
import { segmentSelected } from "./Actions.js";

const useStyles = (theme) => ({
  paper: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class Item extends React.Component {
  handleClick(event) {
    this.props.selectSegment(this.props.index);
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper
        className={classes.paper}
        elevation={0}
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
)(withStyles(useStyles)(Item));
