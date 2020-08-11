import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ItemUI from "./Item/ItemComponent.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 40,
    width: 40,
    padding: 0,
  },
  control: {
    padding: theme.spacing(0),
  },
});

class SymbolListUI extends React.Component {
  render() {
    const { classes } = this.props;

    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <Grid key={idx} item>
            <Paper className={classes.paper}>{idx}</Paper>
          </Grid>
        );
      });
    return (
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
          {segmentList}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.resultPaneReducer.boardGridSegments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SymbolListUI));

/*<div>{segmentList}</div>*/

/*<ItemUI
  key={idx}
  index={idx}
  selectSegment={this.props.selectSegment}
/>*/
