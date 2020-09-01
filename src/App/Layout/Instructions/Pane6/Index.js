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
import clear_board from "../../../../Assets/Media/clear_board.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane6 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the drawing board (4/5)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Want to start over? Clear the whole drawing board.
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            To reset the whole drawing board, use the "CLEAR" button on the top
            right of the screen (on the green menu bar).
            <br />
            <br />
          </Typography>
          <img src={clear_board} height={200} alt="Clear Board GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            Be aware that once you clear the board, your drawing will be lost
            and you will not be able to retrieve it!
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
)(withStyles(useStyles)(Pane6));
