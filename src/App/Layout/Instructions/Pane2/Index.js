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
import writing_big from "../../../../Assets/Media/writing_big.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane2 extends React.Component {
  // Displays the tutorial part explaining the analysis pane. There are no functional components,
  // only text and images
  render() {
    //  const { classes } = this.props;
    return (
      <Card align="center" elevation={0}>
        <CardContent>
          <Typography component="span" variant="h4" gutterBottom>
            What is handCalc?
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            <br />
            At its core, handCalc is a machine-based interface that allows users
            to write simple mathematical expressions for them to be and
            evaluated
            <br />
          </Typography>

          <Typography component="span" variant="body2">
            <br />
            Any mathematical expression using simple operators can be written on
            the drawing board using the mouse, which will then be processed and
            evaluated by a neural network.
            <br />
            <br />
          </Typography>
          <img src={writing_big} height={150} alt="Writing Big GIF" />
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
)(withStyles(useStyles)(Pane2));
