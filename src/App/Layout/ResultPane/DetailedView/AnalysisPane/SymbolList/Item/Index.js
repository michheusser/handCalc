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
// Actions
import { segmentSelected } from "./Actions.js";
// Components
import Segment from "./Segment/Index.js";
// Material UI (Components)
import Paper from "@material-ui/core/Paper";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  paper: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

// **************************** COMPONENT ****************************
class Item extends React.Component {
  // High level element containing the segment image within the symbol list. When clicked, it
  // changes the state to have the selected element, which in turn updates the details within the
  // components of the analysis pane
  handleClick(event) {
    // Dispatches the action to change a selected segment
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
        <Segment index={this.props.index} />
      </Paper>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
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

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Item));
