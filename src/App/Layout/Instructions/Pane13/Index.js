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
import github from "../../../../Assets/Media/github.png";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane13 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            The End
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Your turn to play!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            I hope you enjoy playing around with this tool, as much as I did
            creating it!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            If you want to go through the tutorial again, you can find it in the
            Menu bar on the top left corner of the screen.
            <br />
            <br />
          </Typography>
          <img src={github} height={120} alt="GitHub PNG" />
          <Typography component="span" variant="body2">
            <br />
            This is an open source project, so feel free to visit the projects
            page in the "GitHub Repository" section, or the machine-learning
            related datasets and custom-libraries from the "About" section, both
            found in the Menu bar on the top left of the screen.
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
)(withStyles(useStyles)(Pane13));
