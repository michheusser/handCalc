import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import SegmentUI from "./Segment/SegmentComponent.js";
import Button from "@material-ui/core/Button";
import AnalysisPaneUI from "./AnalysisPane/AnalysisPaneComponent.js";
import { segmentSelected } from "./ItemActions.js";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

class ItemUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.context = null;
  }
  updateCanvas(ref, idx) {
    if (ref) {
      this.context = ref.getContext("2d");
      const color = { r: 100, g: 100, b: 100 };
      this.context.putImageData(
        this.props.segments[idx].tools.gridManipulator.gridToImage(color),
        0,
        0
      );
    }
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
    this.props.selectSegment(this.props.segments[this.props.index]);
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;
    const { classes } = this.props;
    return (
      <div>
        <Button
          aria-describedby={this.props.id}
          variant="outlined"
          color="primary"
          onClick={this.handleClick.bind(this)}
        >
          <SegmentUI index={this.props.index} id={id} />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose.bind(this)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <AnalysisPaneUI />
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.resultPaneReducer.paneOpen,
    segments: state.resultPaneReducer.boardGridSegments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectSegment: (segment) => {
      dispatch(segmentSelected(segment));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ItemUI));

/*
<SegmentUI index={this.props.index} id={id} />
*/

/*          <Typography className={classes.typography}>
            <AnalysisPaneUI />
          </Typography>*/
