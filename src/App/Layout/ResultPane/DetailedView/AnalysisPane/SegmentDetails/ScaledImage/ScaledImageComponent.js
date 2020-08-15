import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {},
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperInside: {
    margin: 0,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class ScaledImageUI extends React.Component {
  constructor(props) {
    super(props);

    this.context = null;
  }

  updateCanvas(ref) {
    if (ref && this.props.selectedSegment !== null) {
      this.context = ref.getContext("2d");

      let color = { r: 30, g: 30, b: 30 };
      let segment = this.props.segments[this.props.selectedSegment];

      let image = segment.tools.gridManipulator.gridToImage(color);
      this.context.putImageData(image, 0, 0);
    }
  }

  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
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
        <Paper
          className={classes.paperInside}
          variant="outlined"
          color="secondary"
          height={1}
          width={1}
        >
          <canvas
            width={120}
            height={120}
            style={{ border: "none" }}
            ref={(ref) => {
              this.updateCanvas(ref);
            }}
          />
        </Paper>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSegment: state.analysisPaneReducer.selectedSegment,
    segments: state.resultPaneReducer.scaledCuratedSegments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ScaledImageUI));

/*
<Card elevation={1} className={classes.root}>
  <CardContent className={classes.cardContent}>
    <Typography
      className={classes.title}
      color="textSecondary"
      gutterBottom
    ></Typography>
    <Card variant="outlined" elevation={1} padding={3}>
      <canvas
        width={120}
        height={120}
        style={{ border: "none" }}
        ref={(ref) => {
          this.updateCanvas(ref);
        }}
      />
    </Card>
  </CardContent>
</Card>*/
