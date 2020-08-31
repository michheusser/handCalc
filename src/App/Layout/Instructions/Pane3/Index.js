/*
Copyright 2020, Michel Heusser
ALl rights reserved
https://github.com/michheusser
*/

// **************************** IMPORTS ****************************
// React (Core)
import React from "react";
// Redux (State Management)
import { connect } from "react-redux";
// Material UI (Components)
import { Typography, Card, CardContent } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";
// Diverse
import writing_small from "../../../../Assets/Media/writing_small.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane3 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the drawing board (1/5)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Introducing... the drawing board.
            <br />
          </Typography>

          <Typography component="span" variant="body2">
            <br />
            The drawing board is the interface for you to write mathematical
            expressions to be processed and evaluated by the image processing
            and machine learning algorithms.
            <br />
            <br />
            To start, draw any mathematical expression using the following
            symbols: 0-9 (numbers), + (plus), - (minus), * (times), / (divided),
            [ (open parenthesis), ] (close paranthesis). <br />
            <br />
          </Typography>
          <img src={writing_small} height={150} alt="Writing Small GIF" />
        </CardContent>
      </Card>
    );
  }
}

// ***************** REDUX STATE/DISPATCH CONNECTION ******************
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// ************ EXPORT, STYLING AND SUBSCRIPTION TO STATE *************
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Pane3));
