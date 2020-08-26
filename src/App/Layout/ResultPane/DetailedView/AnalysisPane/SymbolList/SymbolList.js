import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Item from "./Item/Item.js";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({});

class SymbolList extends React.Component {
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

const mapStateToProps = (state) => {
  return {
    segmentsLength: state.gridProcessorReducer.originalSegmentsInfo.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SymbolList));

/*<div>{segmentList}</div>*/

/*<Item
  key={idx}
  index={idx}
  selectSegment={this.props.selectSegment}
/>*/
