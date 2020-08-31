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
import process from "../../../../Assets/Media/process.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane8 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Processing your expression
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Happy with your expression? Time to process it!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            To continue with the segmentation, recognition and evaluation of
            your expression, click on the "START" button at the top right of the
            screen (on the green menu bar) to start the process.
            <br />
            <br />
          </Typography>
          <img src={process} height={120} alt="Process GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            Normally the processing should take only a couple of seconds, but
            depending on the complexity of your drawing, the size of the drawing
            board, the amount of independent symbols written, and your
            computer's speed, this process might take longer to finish. In any
            case, please be patient.
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
)(withStyles(useStyles)(Pane8));
