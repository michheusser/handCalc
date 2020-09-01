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
import resize from "../../../../Assets/Media/resize.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane7 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the drawing board (5/5)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Resize the drawing board to your liking!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            Before you start writing expressions, make sure that you are
            comfortable with the size of the drawing board.
            <br />
            <br />
          </Typography>
          <img src={resize} height={150} alt="Resize GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            You can resize the browser window anytime, to any size you want, but
            be aware that each time, the drawing board will be recalculated, and
            you may lose part of your drawing for ever if the board becomes
            smaller.
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
)(withStyles(useStyles)(Pane7));
