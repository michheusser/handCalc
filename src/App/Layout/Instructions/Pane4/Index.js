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
import writing from "../../../../Assets/Media/writing.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane4 extends React.Component {
  // Displays the tutorial part introducing the web-app. There are no functional components,
  // only text and images
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the drawing board (2/5)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Drawing new symbols
            <br />
          </Typography>

          <Typography component="span" variant="body2">
            <br />
            To write accross the drawing board, press the left click on your
            mouse and drag it through the board.
            <br />
            <br />
          </Typography>
          <img src={writing} height={100} alt="Writing GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            If you're using a track-pad on a portable computer use the main
            click. If this doesn't seem to work, you might want to try to draw
            as if you were dragging and dropping a file on the desktop.
            <br />
            <br />
          </Typography>
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
)(withStyles(useStyles)(Pane4));
