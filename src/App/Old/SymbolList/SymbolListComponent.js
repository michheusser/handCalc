import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Popover from "@material-ui/core/Popover";
import ItemUI from "./Item/ItemComponent.js";

import Button from "@material-ui/core/Button";

import { Typography } from "@material-ui/core";

const useStyles = (theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
});

class SymbolListUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;
    const { classes } = this.props;

    let segmentList = new Array(this.props.segments.length)
      .fill(null)
      .map((_, idx) => {
        return (
          <ItemUI
            key={idx}
            index={idx}
            selectSegment={this.props.selectSegment}
          />
        );
      });
    return (
      <div>
        <Button
          aria-describedby={id}
          variant="text"
          color="primary"
          onClick={this.handleClick.bind(this)}
        >
          <Typography variant="h3">{this.props.text}</Typography>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose.bind(this)}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <div>{segmentList}</div>
        </Popover>
      </div>
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
