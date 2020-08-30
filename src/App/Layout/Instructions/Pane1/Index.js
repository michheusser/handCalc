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
import { Typography, Card, CardContent, Box } from "@material-ui/core";
// Material UI (Design)
import { withStyles } from "@material-ui/core/styles";
// Diverse
import important from "../../../../Assets/Media/important.png";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane1 extends React.Component {
  // Displays the tutorial part introducing the web-app. There are no functional components,
  // only text and images
  render() {
    //const { classes } = this.props;

    return (
      <Card elevation={0}>
        <CardContent align="center" component="div">
          <Typography component="span" variant="h4">
            Welcome to handCalc!
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            <br />
            This short tutorial will walk you through all features of this
            application.
            <br />
          </Typography>

          <Typography component="span" variant="body2">
            <br />
            Before you start, it is highly recommended to resize your browser
            window to be full-screen for a better user experience!
            <br />
            <br /> If you want to dive right in, feel free to skip the tutorial
            by press the close button on the top right (or just click outside
            the pane). Otherwise, press "Next"!
            <br />
            <br />
          </Typography>
          <img src={important} height={50} alt="IMPORTANT PNG" />
          <Typography component="span" variant="body2">
            <Box fontWeight="fontWeightBold" padding={0} margin={0}>
              IMPORTANT: This web-app is currently not yet optimized for mobile
              browsers. So please make sure you're using it on Google Chrome,
              Firefox, or Safari for MacOS or Windows
              <br />
            </Box>
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
)(withStyles(useStyles)(Pane1));
