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
import prediction from "../../../../Assets/Media/prediction.gif";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane11 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the analysis pane (3/4)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Interpret the prediction statistics
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            Every neural network has its limitations, and may not always
            recognize a specific symbol, or confuse it with a different one.
            <br />
            <br />
          </Typography>
          <img src={prediction} height={200} alt="Prediction GIF" />
          <Typography component="span" variant="body2">
            <br />
            <br /> If one or more of your handwritten symbols were not correctly
            recognized, use the analysis pane to infer the type of confusion by
            seeing if there are other prediction candidates with similar
            likelihood.
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
)(withStyles(useStyles)(Pane11));
