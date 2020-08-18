import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ItemUI from "./Item/ItemComponent.js";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({});

class SymbolListUI extends React.Component {
  render() {
    //  const { classes } = this.props;

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
        <Grid elevation={0} container spacing={0}>
          {itemList}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    segments: state.gridProcessorReducer.scaledOriginalSegments,
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
