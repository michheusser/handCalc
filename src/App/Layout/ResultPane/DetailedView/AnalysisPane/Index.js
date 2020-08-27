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
import SymbolList from "./SymbolList/Index.js";
import SegmentDetails from "./SegmentDetails/Index.js";
// Material UI (Components)
import { Paper, Grid, Divider } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";

// **************************** STYLING ****************************
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

// **************************** COMPONENT ****************************
class AnalysisPane extends React.Component {
  // Sets out the overall grid layout for the detailed view in the analysis pane containing both
  // the container with the detailed images and cards and the symbol list that allows to
  // chose different segments to analyse
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <SymbolList />
            </Paper>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <SegmentDetails />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AnalysisPane));
