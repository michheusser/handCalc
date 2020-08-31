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
import erase from "../../../../Assets/Media/erase.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane5 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the drawing board (3/5)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Polish your drawings with erase!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            To erase a stroke on the drawing board, press the right click on
            your mouse and drag it through the strokes you want do delete.
            <br />
            <br />
          </Typography>
          <img src={erase} height={150} alt="Writing GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            If you're using a track-pad on a portable computer use the secondary
            click of the track-pad. If this doesn't seem to work, you might want
            to try to draw as if you were dragging and dropping a file on the
            desktop, but using the secondary click. Be aware that a secondary
            click might not always be configured.
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
)(withStyles(useStyles)(Pane5));
