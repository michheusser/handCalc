/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import erase from "../Media/erase.gif";
import start from "../Media/start.gif";
import writing from "../Media/writing.gif";
//
const useStyles = (theme) => ({});

class Drawing extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <Card elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            Drawing
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            The drawing board is the interface for you to write mathematical
            expressions to be processed, recognized, and evaluated by the image
            processing and machine learning algorithms.
            <br />
          </Typography>

          <Typography component="span" variant="body2" gutterBottom>
            To start, draw any mathematical expression that can be simplified to
            a numerical result (show gif) using the following symbols: 0-9
            (numbers), + (plus), - (minus), * (times), / (divided), [ (open
            parenthesis) ] (close paranthesis). <br />
            Press the left click of the mouse to draw on the board.
            <br />
          </Typography>
          <img src={writing} height={100} alt="Writing GIF" />
          <Typography component="span" variant="body2" gutterBottom>
            <br />
            To erase a stroke, use the right click (or SHIFT+left click). To
            reset the whole drawing pane click ... <br />
            <br />
          </Typography>
          <img src={erase} height={100} alt="Erase GIF" />
          <Typography component="span" variant="body2" gutterBottom>
            <br />
            Once you're happy with your stroke, click on the "START" button to
            trigger the recognition process.
            <br />
          </Typography>
          <img src={start} height={100} alt="Start Button GIF" />
        </CardContent>
      </Card>
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
)(withStyles(useStyles)(Drawing));
