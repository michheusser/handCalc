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
import detailed_view from "../../../../Assets/Media/detailed_view.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane9 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the analysis pane (1/3)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Get nerdy. Analyse the prediction details!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            Once your expression has been evaluated, you can view the details of
            the prediction using the detailed view. To access it, click on the
            expansion arrow below the predicted expression
            <br />
            <br />
          </Typography>
          <img src={detailed_view} height={300} alt="Detailed View GIF" />
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
)(withStyles(useStyles)(Pane9));
