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
    height: 50,
    width: 50,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  control: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
});

class SymbolListUI extends React.Component {
  render() {
    const { classes } = this.props;

    let itemList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <Grid elevation={0} key={idx} item>
            <ItemUI index={idx} />
          </Grid>
        );
      });
    return (
      <Grid item xs={12}>
        <Grid elevation={0} container justify="left" spacing={0}>
          {itemList}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.resultPaneReducer.scaledOriginalSegments,
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
