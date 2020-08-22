import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//
const useStyles = (theme) => ({
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingLeft: 0,
    display: "block",
    alignItems: "top",
    justifyContent: "top",
  },
});

class ImageDetailsUI extends React.Component {
  getMessage() {
    const message = `The original drawing of this symbol has a total of ${
      this.props.originalSegments[this.props.selectedSegment].xFields *
      this.props.originalSegments[this.props.selectedSegment].yFields
    } pixels, out of which ${
      this.props.originalSegments[this.props.selectedSegment].getFilledFields()
        .length
    } are non-empty. If the dimensions are too small, the neural network might have difficulties identifying the symbol with precision`;
    return message;
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper
        className={classes.paper}
        elevation={0}
        color="secondary"
        height={1}
        width={1}
      >
        <Typography align="left" variant="caption" component="h2">
          Original segment:{" "}
          {this.props.originalSegments[this.props.selectedSegment].xFields}x
          {this.props.originalSegments[this.props.selectedSegment].yFields}{" "}
          pixels
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Processed segment:{" "}
          {this.props.curatedSegments[this.props.selectedSegment].xFields}x
          {this.props.curatedSegments[this.props.selectedSegment].yFields}{" "}
          pixels
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Used pixels:{" "}
          {
            this.props.originalSegments[
              this.props.selectedSegment
            ].getFilledFields().length
          }
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          Used pixels (processed):{" "}
          {
            this.props.curatedSegments[
              this.props.selectedSegment
            ].getFilledFields().length
          }
        </Typography>
        <Typography align="left" variant="caption" component="h2">
          <br />
          {this.getMessage()}
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    originalSegments: state.gridProcessorReducer.originalSegments,
    curatedSegments: state.gridProcessorReducer.curatedSegments,
    selectedSegment: state.analysisPaneReducer.selectedSegment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ImageDetailsUI));

/*<Card elevation={1} className={classes.root}>
  <CardContent>
    <Typography
      align="left"
      className={classes.title}
      color="textSecondary"
      gutterBottom
    ></Typography>
    <Typography align="left" variant="body2" component="h2">
      Original segment: 15x15 pixels
    </Typography>
    <Typography align="left" variant="body2" component="p">
      Processed segment: 28x28 pixels
    </Typography>
    <Typography align="left" variant="body2" component="p">
      Used pixels: 8
    </Typography>
    <Typography align="left" variant="body2" component="p">
      Used pixels (after processing): 8
    </Typography>
  </CardContent>
</Card>
    */
