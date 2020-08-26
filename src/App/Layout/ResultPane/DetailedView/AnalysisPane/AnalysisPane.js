import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SymbolList from "./SymbolList/SymbolList.js";
import SegmentDetails from "./SegmentDetails/SegmentDetails.js";
import Divider from "@material-ui/core/Divider";
//

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

class AnalysisPane extends React.Component {
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AnalysisPane));
