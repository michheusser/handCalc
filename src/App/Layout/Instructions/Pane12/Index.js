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
import similar from "../../../../Assets/Media/similar.png";

// **************************** STYLING ****************************
const useStyles = (theme) => ({});

// **************************** COMPONENT ****************************
class Pane12 extends React.Component {
  // Displays the a tutorial pane. There are no functional components, only text and images.
  render() {
    //const { classes } = this.props;

    return (
      <Card align="center" elevation={0}>
        <CardContent component="div">
          <Typography component="span" variant="h4">
            Using the analysis pane (4/4)
            <br />
          </Typography>
          <Typography component="span" variant="h6" gutterBottom>
            <br />
            Be nice to the algorithms!
            <br />
          </Typography>
          <Typography component="span" variant="body2">
            <br />
            Make sure you write the symbols in a way that identifies them best
            from similar ones, where the neural network is more prone confuse
            them (e.g. always crossing the "7", not forgetting the head of a
            "1", not forgetting the square head and tail of the square brackets
            "[" and "]")
            <br />
            <br />
          </Typography>
          <img src={similar} height={100} alt="Similar PNG" />
          <Typography component="span" variant="body2">
            <br />
            <br />
            In general, be aware that the way we understand certain handwritten
            signs may different than a neural network with a tiny fraction of
            the capacity of a human brain. In some cases it might require small
            changes in a drawing to completely change the prediction. In case a
            sign might not be recognized, go back and try to make it clearer.
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
)(withStyles(useStyles)(Pane12));
