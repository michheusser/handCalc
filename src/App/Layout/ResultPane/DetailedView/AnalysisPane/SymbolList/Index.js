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
// Components
import Item from "./Item/Index.js";
// Material UI (Components)
import Grid from "@material-ui/core/Grid";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class SymbolList extends React.Component {
  // Handles the overall layout for the symbol list to select segments.
  render() {
    //  const { classes } = this.props;

    let itemList = new Array(this.props.segmentsLength)
      .fill(null)
      .map((_, idx) => {
        return (
          <Grid elevation={0} key={idx} item>
            <Item index={idx} />
          </Grid>
        );
      });
    return (
      <Grid item xs={12}>
        <Grid elevation={0} container spacing={0}>
          {itemList}
        </Grid>
      </Grid>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {
    segmentsLength: state.drawBoardReducer.originalSegmentsInfo.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SymbolList));
